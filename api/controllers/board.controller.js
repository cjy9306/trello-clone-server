const BoardService = require('../services/board.service');

exports.getBoard = async (req, res, next) => {
	const { boardId } = req.params;

	try {
		const board = await BoardService.getBoard(boardId);

		res.status(200).json({ success: true, data: board });
	} catch (e) {
		return next(e.message);
	}
};

exports.createBoard = async (req, res, next) => {
	const boardDTO = req.body;

	try {
		const board = await BoardService.createBoard(boardDTO);

		res.status(200).json({ success: true, data: board });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteBoard = async (req, res, next) => {
	const { boardId } = req.params;

	try {
		const message = await BoardService.deleteBoard(boardId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.createList = async (req, res, next) => {
	let listDTO = req.body;
	listDTO['boardId'] = req.params.boardId;
	try {
		const list = await BoardService.createList(listDTO);

		res.status(200).json({ success: true, data: list });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateList = async (req, res, next) => {
	const { listId } = req.params;
	let listDTO = req.body;
	listDTO['listId'] = listId;
	try {
		const message = await BoardService.updateList(listDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteList = async (req, res, next) => {
	const { listId } = req.params;
	try {
		const message = await BoardService.deleteList(listId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateCardSequence = async (req, res, next) => {
	const seqDTO = req.body;
	try {
		const message = await BoardService.updateCardSequence(seqDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateListSequence = async (req, res, next) => {
	const { boardId } = req.params;
	let seqDTO = req.body;
	seqDTO['boardId'] = boardId;
	try {
		const message = await BoardService.updateListSequence(seqDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.createCard = async (req, res, next) => {
	const cardDTO = req.body;
	cardDTO['listId'] = req.params.listId;
	try {
		const card = await BoardService.createCard(cardDTO);

		res.status(200).json({ success: true, data: card });
	} catch (e) {
		return next(e.message);
	}
};

exports.getCard = async (req, res, next) => {
	const { cardId } = req.params;
	try {
		const card = await BoardService.getCard(cardId);

		res.status(200).json({ success: true, data: card });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteCard = async (req, res, next) => {
	const { cardId } = req.params;
	try {
		const message = await BoardService.deleteCard(cardId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.getCardMembers = async (req, res, next) => {
	const { cardId } = req.params;
	try {
		const members = await BoardService.getCardMembers(cardId);

		res.status(200).json({ success: true, data: members });
	} catch (e) {
		return next(e.message);
	}
};

exports.addCardMember = async (req, res, next) => {
	const { cardId } = req.params;
	let memberDTO = req.body;
	memberDTO['cardId'] = cardId;
	try {
		const member = await BoardService.addCardMember(memberDTO);

		res.status(200).json({ success: true, data: member });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteCardMember = async (req, res, next) => {
	const { cardId, memberId } = req.params;
	try {
		const message = await BoardService.deleteCardMember(cardId, memberId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateCard = async (req, res, next) => {
	let cardDTO = req.body;
	try {
		const message = await BoardService.updateCard(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateCardDescription = async (req, res, next) => {
	const { cardId } = req.params;
	let cardDTO = req.body;
	cardDTO['cardId'] = cardId;
	try {
		const message = await BoardService.updateCardDescription(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateCardDueDate = async (req, res, next) => {
	const { cardId } = req.params;
	let cardDTO = req.body;
	cardDTO['cardId'] = cardId;
	try {
		const message = await BoardService.updateCardDueDate(cardDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.createChecklist = async (req, res, next) => {
	const { cardId } = req.params;
	let checklistDTO = req.body;
	checklistDTO['cardId'] = cardId;
	try {
		const checklist = await BoardService.createCheckList(checklistDTO);

		res.status(200).json({ success: true, data: checklist });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteChecklist = async (req, res, next) => {
	const { checklistId } = req.params;
	try {
		const message = await BoardService.deleteCheckList(checklistId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.getChecklist = async (req, res, next) => {
	const { cardId } = req.params;
	try {
		const checklist = await BoardService.getChecklist(cardId);

		res.status(200).json({ success: true, data: checklist });
	} catch (e) {
		return next(e.message);
	}
};

exports.createChecklistItem = async (req, res, next) => {
	const { checklistId } = req.params;
	let checklistItemDTO = req.body;
	checklistItemDTO['checklistId'] = checklistId;
	try {
		const checklistItem = await BoardService.createChecklistItem(checklistItemDTO);

		res.status(200).json({ success: true, data: checklistItem });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateChecklistItem = async (req, res, next) => {
	const { itemId } = req.params;
	let checklistItemDTO = req.body;
	checklistItemDTO['itemId'] = itemId;
	try {
		const message = await BoardService.updateChecklistItem(checklistItemDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteChecklistItem = async (req, res, next) => {
	const { itemId } = req.params;
	try {
		const message = await BoardService.deleteChecklistItem(itemId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.createComment = async (req, res, next) => {
	const { cardId } = req.params;
	let commentDTO = req.body;
	commentDTO['cardId'] = cardId;
	try {
		const comment = await BoardService.createComment(commentDTO);

		res.status(200).json({ success: true, data: comment });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteComment = async (req, res, next) => {
	const { commentId } = req.params;
	try {
		const message = await BoardService.deleteComment(commentId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateCardLabel = async (req, res, next) => {
	const { cardId, labelId } = req.params;
	let labelDTO = req.body;
	labelDTO['cardId'] = cardId;
	labelDTO['labelId'] = labelId;
	try {
		const message = await BoardService.updateCardLabel(labelDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.getAllLabels = async (req, res, next) => {
	try {
		const labels = await BoardService.getAllLabels();

		res.status(200).json({ success: true, data: labels });
	} catch (e) {
		return next(e.message);
	}
};

exports.getBoardMembers = async (req, res, next) => {
	const { boardId } = req.params;
	try {
		const members = await BoardService.getBoardMembers(boardId);

		res.status(200).json({ success: true, data: members });
	} catch (e) {
		return next(e.message);
	}
};

exports.addBoardMember = async (req, res, next) => {
	const { boardId } = req.params;
	let memberDTO = req.body;
	memberDTO['boardId'] = boardId;
	try {
		const message = await BoardService.addBoardMember(memberDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteBoardMember = async (req, res, next) => {
	const { boardId, memberId } = req.params;
	try {
		const message = await BoardService.deleteBoardMember(boardId, memberId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};
