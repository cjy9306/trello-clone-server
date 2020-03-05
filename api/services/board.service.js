const Sequelize = require('sequelize');
const models = require('../../models/models');
const Op = Sequelize.Op;

class BoardService {
    getAllBoards = async (memberId) => {
        try {
            const personalBoards = await models.Board.findAll({
                include: [
                    {
                        model: models.Members,
                        through: {
                            attributes: ['board_id','member_id']
                        },
                        where: {
                            member_id: memberId
                        }
                    }
                ],
                where: {
                    team_id: null,
                }
            });

            const teamBoards = await models.Team.findAll({
                include: [
                    {
                        model: models.Members,
                        through: {
                            attributes: ['member_id', 'username'],
                        },
                        where: {
                            member_id: memberId,
                        }
                    },
                    {
                        model: models.Board,
                        where: {
                            team_id: Sequelize.col('team.team_id'),
                        },
                        required: false,
                    },
                ]
            });
            
            return { personalBoards, teamBoards };
        } catch(e) {
            throw e;
        }
    };

    getBoard = async (boardId) => {
        try {
            const board = await models.Board.findOne({
                where: {
                    board_id: boardId,
                }
            });
            
            const lists = await models.List.findAll({
                where: {
                    board_id: boardId,
                },
                include: [{
                    model: models.Card, 
                    include: [{
                        model: models.Labels,
                        through: {
                            attributes: ['label_id', 'label_name', 'color'],
                        }
                    }],
                }],
                order: [
                    ['seq', 'asc'],
                    [models.Card, 'seq', 'asc'],
                ]
            });
            return { board, lists };
        } catch(e) {
            throw e;
        }
    };

    getBoardMembers = async (boardId) => {
        try {
            const members = await models.Members.findAll({
                include: [
                    {
                        model: models.Board,
                        where: {
                            board_id: boardId,
                        }
                    },
                ]
            })

            return { members };
        } catch(e) {
            throw e;
        }
    };

    createBoard = async (boardDTO) => {
        const trans = await models.sequelize.transaction();

        try {
            const board = await models.Board.create({
                board_id: 0,
                board_name: boardDTO.board_name,
                public_scope: boardDTO.public_scope,
                member_id: boardDTO.member_id,
                team_id: boardDTO.team_id,
                create_time: Date.now(),
                background_color: boardDTO.background_color,
            }, {transaction: trans});

            const boardMember = await models.BoardMember.create({
                board_id: board.board_id,
                member_id: boardDTO.member_id,
                role: 'admin',
            }, {transaction: trans});

            trans.commit();
            return { board };
        } catch(e) {
            throw new Error(e);
        }
    };

    deleteBoard = async (boardId) => {
        try {
            await models.Board.destroy({
                where: {
                    board_id: boardId,
                }
            });

            return 'delete board success';
        } catch(e) {
            throw new Error(e);
        }
    };

    createList = async (listDTO) => {
        try {
            const list = await models.List.create({
                list_id: 0,
                board_id: listDTO.board_id,
                list_name: listDTO.list_name,
                seq: listDTO.seq,
                create_time: Date.now(),
            });
            
            return { list };
        } catch(e) {
            throw e;
        }
    };

    updateList = async (listDTO) => {
        try {
            await models.List.update(
                {
                    list_name: listDTO.list_name,
                    seq: listDTO.seq,
                },
                {
                    where: {
                        list_id: listDTO.list_id
                    }
                }
            );
            
            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    deleteList = async (listId) => {
        try {
            await models.List.destroy({
                where: {
                    list_id: listId
                }
            });
            
            return 'delete success';
        } catch(e) {
            throw e;
        }
    }

    updateCardSequence = async (seqDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            if (seqDTO.sourceListId === seqDTO.destListId) {
                if (seqDTO.sourceCardSeq < seqDTO.destCardSeq) {
                    await models.Card.update(
                        {
                            seq: Sequelize.literal('seq - 1'),
                        },
                        {
                            where: {
                                [Op.and]: [
                                    { list_id: seqDTO.sourceListId },
                                    { seq: {[Op.gte]: seqDTO.sourceCardSeq + 1}},
                                    { seq: {[Op.lte]: seqDTO.destCardSeq}}
                                ],
                            },
                            transaction: trans,
                        }
                    );
                } else {
                    await models.Card.update(
                        {
                            seq: Sequelize.literal('seq + 1'),
                        },
                        {
                            where: {
                                [Op.and]: [
                                    { list_id: seqDTO.sourceListId },
                                    { seq: {[Op.gte]: seqDTO.destCardSeq}},
                                    { seq: {[Op.lte]: seqDTO.sourceCardSeq}}
                                ],
                            },
                            transaction: trans,
                        }
                    );
                }

                await models.Card.update(
                    {
                        seq: seqDTO.destCardSeq,
                    },
                    {
                        where: {
                            card_id: seqDTO.cardId
                        },
                        transaction: trans,
                    }
                )
            } else {
                // 카드가 자신의 리스트에서 다른 리스트로 옮겨질 경우
                await models.Card.update(
                    {
                        seq: Sequelize.literal('seq - 1'),
                    },
                    {
                        where: {
                            [Op.and]: [
                                { list_id: seqDTO.sourceListId },
                                { seq: {[Op.gte]: seqDTO.sourceCardSeq + 1}},
                            ],
                        },
                        transaction: trans,
                    }
                );

                await models.Card.update(
                    {
                        seq: Sequelize.literal('seq + 1'),
                    },
                    {
                        where: {
                            [Op.and]: [
                                { list_id: seqDTO.destListId },
                                { seq: {[Op.gte]: seqDTO.destCardSeq}},
                            ],
                        },
                        transaction: trans,
                    }
                );

                await models.Card.update(
                    {
                        seq: seqDTO.destCardSeq,
                        list_id: seqDTO.destListId,
                    },
                    {
                        where: {
                            card_id: seqDTO.cardId
                        },
                        transaction: trans,
                    }
                )
            }

            trans.commit();
            return 'update success';
        } catch(e) {
            throw e;
        } 
    };

    updateListSequence = async (seqDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            if (seqDTO.sourceListSeq < seqDTO.destListSeq) {
                await models.List.update(
                    {
                        seq: Sequelize.literal('seq - 1'),
                    },
                    {
                        where: {
                            [Op.and]: [
                                { board_id: board_id },
                                { seq: {[Op.gte]: seqDTO.sourceListSeq + 1}},
                                { seq: {[Op.lte]: seqDTO.destListSeq}},
                            ]
                        },
                        transaction: trans,
                    }
                );
            } else {
                await models.List.update(
                    {
                        seq: Sequelize.literal('seq + 1'),
                    },
                    {
                        where: {
                            [Op.and]: [
                                { board_id: seqDTO.boardId },
                                { seq: {[Op.gte]: seqDTO.destListSeq}},
                                { seq: {[Op.lte]: seqDTO.sourceListSeq}},
                            ]
                        },
                        transaction: trans,
                    }
                );
            }
    
            await models.List.update(
                {
                    seq: seqDTO.destListSeq,
                },
                {
                    where: {
                        list_id: seqDTO.listId,
                    },
                    transaction: trans,
                }
            );

            trans.commit();
            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    createCard = async (cardDTO) => {
        try {
            const card = await models.Card.create({
                card_id: 0,
                list_id: cardDTO.list_id,
                card_name: cardDTO.card_name,
                seq: cardDTO.seq,
                description: null,
                due_date: null,
            });
            
            return { card };
        } catch(e) {
            throw e;
        }
    };

    // get card, checklist, comments, members
    getCard = async (cardId) => {
        try {
            const card = await models.Card.findOne({
                where: {
                    card_id: cardId,
                },
                include: [{
                    model: models.Labels,
                    through: {
                        attributes: ['label_id', 'label_name', 'color'],
                    }
                }]
            });
            
            const checklist = await models.CheckList.findAll({
                include: [
                    models.CheckListItem,
                ],
                where: {
                    card_id: cardId,
                },
                order: [
                    ['seq', 'asc'],
                    [models.CheckListItem, 'seq', 'asc'],
                ]
            });
            
            const comments = await models.Comment.findAll({
                include: [
                    models.Members,
                ],
                where: {
                    card_id: cardId,
                },
                order: [
                    ['comment_id', 'asc'],
                ]
            });

            const members = await models.Members.findAll({
                include: [{
                    model: models.Card,
                    through: {
                        attributes: ['card_id', 'card_name'],
                    }, 
                    where: {
                        card_id: cardId,
                    }
                }]
            });

            return { card, checklist, comments, members };
        } catch(e) {
            throw e;
        }
    };

    deleteCard = async (cardId) => {
        try {
            await models.Card.destroy({
                where: {
                    card_id: cardId
                }
            });

            return 'delete card success';
        } catch(e) {
            throw e;
        }
    }

    getCardMembers = async (cardId) => {
        try {
            const members = await models.Members.findAll({
                include: [{
                    model: models.Card,
                    through: {
                        attributes: ['card_id', 'card_name'],
                    },
                    where: {
                        card_id: cardId,
                    }
                }]
            });

            return { members };
        } catch(e) {
            throw e;
        }
    };

    addCardMember = async (memberDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            const member = await models.Members.findOne({
                where: {
                    email: memberDTO.email,
                }, 
                transaction: trans,
            });

            if (!member) throw new Error('member not found')
            
            await models.CardMember.create({
                card_id: memberDTO.card_id,
                member_id: member.member_id,
            }, { transaction: trans });

            trans.commit();
            return { member };
        } catch(e) {
            trans.rollback();
            throw e;
        }
    };

    deleteCardMember = async (cardId, memberId) => {
        try {
            await models.CardMember.destroy({
                where: {
                    card_id: cardId,
                    member_id: memberId,
                }
            })

            return 'delete card member success';
        } catch(e) {
            throw e;
        }
    };

    createCheckList = async (checklistDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            const count = await models.CheckList.count({
                where: {
                    card_id: checklistDTO.card_id,
                },
                transaction: trans,
            });
            
            const checklist = await models.CheckList.create({
                checklist_id: 0,
                card_id: checklistDTO.card_id,
                checklist_name: checklistDTO.checklist_name,
                seq: count,
            }, { transaction: trans });

            trans.commit();
            return { checklist };
        } catch(e) {
            throw e;
        }
    };

    deleteCheckList = async (checklistId) => {
        try {
            await models.CheckList.destroy({
                where: {
                    checklist_id: checklistId,
                }
            });
            
            return 'delete success';
        } catch(e) {
            throw e;
        }
    };

    getChecklist = async (cardId) => {
        try {
            const checklist = await models.CheckList.findAll({
                include: [
                    models.CheckListItem,
                ],
                where: {
                    card_id: cardId,
                },
                order: [
                    ['seq', 'asc'],
                    [models.CheckListItem, 'seq', 'asc'],
                ]
            });
            
            return { checklist };
        } catch(e) {
            throw e;
        }
    };

    createChecklistItem = async (checklistItemDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            const count = await models.CheckListItem.count({
                where: {
                    checklist_id: checklistItemDTO.checklist_id,
                },
                transaction: trans,
            });

            const checklistItem = await models.CheckListItem.create({
                item_id: 0,
                checklist_id: checklistItemDTO.checklist_id,
                item_name: checklistItemDTO.item_name,
                seq: count,
            }, { transaction: trans });

            trans.commit();
            return { checklistItem };
        } catch(e) {
            throw e;
        }
    };

    updateChecklistItem = async (checklistItemDTO) => {
        try {
            await models.CheckListItem.update(
                {
                    item_name: checklistItemDTO.item_name,
                    checked: checklistItemDTO.checked,
                },
                {
                    where: {
                        item_id: checklistItemDTO.item_id,
                    }
                }
            );
            
            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    deleteChecklistItem = async (checklistItemId) => {
        try {
            await models.CheckListItem.destroy({
                where: {
                    item_id: checklistItemId,
                }
            });
            
            return 'delete success';
        } catch(e) {
            throw e;
        }
    };

    updateCardDescription = async (cardDTO) => {
        try {
            await models.Card.update(
                {
                    description: cardDTO.description,
                },
                {
                    where: {
                        card_id: cardDTO.card_id,
                    }
                }
            );
            
            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    updateCardDueDate = async (cardDTO) => {
        try {
            await models.Card.update(
                {
                    due_date: cardDTO.due_date,
                },
                {
                    where: {
                        card_id: cardDTO.card_id,
                    }
                }
            );
            
            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    createComment = async (commentDTO) => {
        try {
            await models.Comment.create({
                comment_id: 0,
                card_id: commentDTO.card_id,
                member_id: commentDTO.member_id,
                contents: commentDTO.comment,
                create_time: Date.now(),
            });
            return 'create success';
        } catch(e) {
            throw e;
        }
    };

    deleteComment = async (commentId) => {
        try {
            await models.Comment.destroy({
                where: {
                    comment_id: commentId,
                }
            });

            return 'delete success';
        } catch(e) {
            throw e;
        }
    };

    updateCardLabel = async (labelDTO) => {
        console.log('labelDTO ; ' + JSON.stringify(labelDTO))
        try {
            if (labelDTO.checked === true) {
                // 새로 레이블이 추가됨
                await models.CardLabels.create({
                    card_id: labelDTO.card_id,
                    label_id: labelDTO.label_id,
                });
            } else {
                // 기존 레이블을 삭제
                await models.CardLabels.destroy({
                    where: {
                        card_id: labelDTO.card_id,
                        label_id: labelDTO.label_id,
                    },
                })
            };

            return 'update success';
        } catch(e) {
            throw e;
        }
    };

    getAllLabels = async () => {
        try {
            const labels = await models.Labels.findAll();

            return { labels };
        } catch(e) {
            throw e;
        }
    };

    

    addBoardMember = async (memberDTO) => {
        try {
            const member = await models.Members.findOne({
                where: {
                    email: memberDTO.email,
                }
            });

            if (!member) throw new Error('The member has email does not exist.');

            await models.BoardMember.create({
                board_id: memberDTO.board_id,
                member_id: member.member_id,
                role: 'member',
            });

            return 'add member success';
        } catch(e) {
            throw e;
        }
    };

    deleteBoardMember = async (boardId, memberId) => {
        try {
            await models.BoardMember.destroy({
                where: {
                    board_id: boardId,
                    member_id: memberId,
                }
            });

            return 'delete member success';
        } catch(e) {
            throw e;
        }
    };

    
};

module.exports = new BoardService();