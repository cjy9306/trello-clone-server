const router = require('express').Router();
const controller = require('../controllers/board.controller');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware);

// board
router.post('', controller.createBoard);
router.get('/:boardId', controller.getBoard);
router.delete('/:boardId', controller.deleteBoard);

// list
router.post('/:boardId/list', controller.createList);
router.put('/:boardId/list/:listId', controller.updateList);
router.delete('/:boardId/list/:listId', controller.deleteList);

// list, card seq
router.put('/:boardId/list/:listId/seq', controller.updateListSequence);
router.put('/:boardId/list/:listId/card/seq', controller.updateCardSequence);

// card
router.get('/:boardId/card/:cardId/members', controller.getCardMembers);
router.post('/:boardId/card/:cardId/member', controller.addCardMember);
router.delete('/:boardId/card/:cardId/member/:memberId', controller.deleteCardMember);
router.post('/:boardId/list/:listId/card', controller.createCard);
router.get('/:boardId/card/:cardId', controller.getCard);
router.delete('/:boardId/card/:cardId', controller.deleteCard);
router.put('/:boardId/card/:cardId', controller.updateCard);
router.put('/:boardId/card/:cardId/description', controller.updateCardDescription);
router.put('/:boardId/card/:cardId/due_date', controller.updateCardDueDate);

// check list
router.post('/:boardId/card/:cardId/checklist', controller.createChecklist);
router.delete('/:boardId/card/:cardId/checklist/:checklistId', controller.deleteChecklist);
router.get('/:boardId/card/:cardId/checklist', controller.getChecklist);

// check list item
router.post('/:boardId/checklist/:checklistId', controller.createChecklistItem);
router.put('/:boardId/checklist_item/:itemId', controller.updateChecklistItem);
router.delete('/:boardId/checklist_item/:itemId', controller.deleteChecklistItem);

// comment
router.post('/:boardId/card/:cardId/comment', controller.createComment);
router.delete('/:boardId/comment/:commentId', controller.deleteComment);

// labels
router.put('/:boardId/card/:cardId/labels/:labelId', controller.updateCardLabel);
router.get('/:boardId/labels', controller.getAllLabels);

// members
router.get('/:boardId/members', controller.getBoardMembers);
router.post('/:boardId/members', controller.addBoardMember);
router.delete('/:boardId/members/:memberId', controller.deleteBoardMember);

module.exports = router;
