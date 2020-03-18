const BoardService = require('../services/board.service');

exports.getBoard = async (req, res) => {
	const { boardId } = req.params;

	try {
		const board = await BoardService.getBoard(boardId);

		res.status(200).json({ success: true, data: board });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createBoard = async (req, res) => {
	const boardDTO = req.body;

	try {
		const board = await BoardService.createBoard(boardDTO);

		res.status(200).json({ success: true, data: board });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteBoard = async (req, res) => {
	const { boardId } = req.params;

	try {
		const message = await BoardService.deleteBoard(boardId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createList = async (req, res) => {
	let listDTO = req.body;
	listDTO['board_id'] = req.params.boardId;
	try {
		const list = await BoardService.createList(listDTO);

		res.status(200).json({ success: true, data: list });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateList = async (req, res) => {
	const { listId } = req.params;
	let listDTO = req.body;
	listDTO['list_id'] = listId;
	try {
		const message = await BoardService.updateList(listDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteList = async (req, res) => {
	const { listId } = req.params;
	try {
		const message = await BoardService.deleteList(listId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateCardSequence = async (req, res) => {
	const seqDTO = req.body;
	console.log('in card seq ; ' + JSON.stringify(seqDTO));
	try {
		const message = await BoardService.updateCardSequence(seqDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateListSequence = async (req, res) => {
	console.warn(' in update List');
	const { boardId } = req.params;
	let seqDTO = req.body;
	seqDTO['boardId'] = boardId;
	console.log(' controller ; ' + JSON.stringify(seqDTO));
	try {
		const message = await BoardService.updateListSequence(seqDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createCard = async (req, res) => {
	const cardDTO = req.body;
	cardDTO['list_id'] = req.params.listId;
	try {
		const card = await BoardService.createCard(cardDTO);

		res.status(200).json({ success: true, data: card });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.getCard = async (req, res) => {
	const { cardId } = req.params;
	try {
		const card = await BoardService.getCard(cardId);

		res.status(200).json({ success: true, data: card });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteCard = async (req, res) => {
	const { cardId } = req.params;
	try {
		const message = await BoardService.deleteCard(cardId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.getCardMembers = async (req, res) => {
	const { cardId } = req.params;
	try {
		const members = await BoardService.getCardMembers(cardId);

		res.status(200).json({ success: true, data: members });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.addCardMember = async (req, res) => {
	const { cardId } = req.params;
	let memberDTO = req.body;
	memberDTO['card_id'] = cardId;
	try {
		const member = await BoardService.addCardMember(memberDTO);

		res.status(200).json({ success: true, data: member });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteCardMember = async (req, res) => {
	const { cardId, memberId } = req.params;
	try {
		const message = await BoardService.deleteCardMember(cardId, memberId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateCard = async (req, res) => {
	let cardDTO = req.body;
	try {
		const message = await BoardService.updateCard(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateCardDescription = async (req, res) => {
	const { cardId } = req.params;
	let cardDTO = req.body;
	cardDTO['card_id'] = cardId;
	try {
		const message = await BoardService.updateCardDescription(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateCardDueDate = async (req, res) => {
	const { cardId } = req.params;
	let cardDTO = req.body;
	cardDTO['card_id'] = cardId;
	try {
		const message = await BoardService.updateCardDueDate(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createChecklist = async (req, res) => {
	const { cardId } = req.params;
	let checklistDTO = req.body;
	checklistDTO['card_id'] = cardId;
	try {
		const checklist = await BoardService.createCheckList(checklistDTO);

		res.status(200).json({ success: true, data: checklist });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteChecklist = async (req, res) => {
	const { checklistId } = req.params;
	try {
		const message = await BoardService.deleteCheckList(checklistId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.getChecklist = async (req, res) => {
	const { cardId } = req.params;
	try {
		const checklist = await BoardService.getChecklist(cardId);

		res.status(200).json({ success: true, data: checklist });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createChecklistItem = async (req, res) => {
	const { checklistId } = req.params;
	let checklistItemDTO = req.body;
	checklistItemDTO['checklist_id'] = checklistId;
	try {
		const checklistItem = await BoardService.createChecklistItem(checklistItemDTO);

		res.status(200).json({ success: true, data: checklistItem });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateChecklistItem = async (req, res) => {
	const { itemId } = req.params;
	let checklistItemDTO = req.body;
	checklistItemDTO['item_id'] = itemId;
	try {
		const message = await BoardService.updateChecklistItem(checklistItemDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteChecklistItem = async (req, res) => {
	const { itemId } = req.params;
	try {
		const message = await BoardService.deleteChecklistItem(itemId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.createComment = async (req, res) => {
	const { cardId } = req.params;
	let commentDTO = req.body;
	commentDTO['card_id'] = cardId;
	try {
		const comment = await BoardService.createComment(commentDTO);

		res.status(200).json({ success: true, data: comment });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteComment = async (req, res) => {
	const { commentId } = req.params;
	try {
		const message = await BoardService.deleteComment(commentId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.updateCardLabel = async (req, res) => {
	const { cardId, labelId } = req.params;
	let labelDTO = req.body;
	labelDTO['card_id'] = cardId;
	labelDTO['label_id'] = labelId;
	try {
		const message = await BoardService.updateCardLabel(labelDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.getAllLabels = async (req, res) => {
	try {
		const labels = await BoardService.getAllLabels();

		res.status(200).json({ success: true, data: labels });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.getBoardMembers = async (req, res) => {
	const { boardId } = req.params;
	try {
		const members = await BoardService.getBoardMembers(boardId);

		res.status(200).json({ success: true, data: members });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.addBoardMember = async (req, res) => {
	const { boardId } = req.params;
	let memberDTO = req.body;
	memberDTO['board_id'] = boardId;
	try {
		const message = await BoardService.addBoardMember(memberDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.deleteBoardMember = async (req, res) => {
	const { boardId, memberId } = req.params;
	try {
		const message = await BoardService.deleteBoardMember(boardId, memberId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};
