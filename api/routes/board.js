const router = require('express').Router()
const controller = require('../controllers/board.controller');
const authMiddleware = require('../../middlewares/auth')
const multer = require('multer');
const path = require("path");

// const storage = multer.diskStorage({
//     destination: function(req, file ,callback){
//         callback(null, "uploads/");
//     },
//     filename: function(req, file, callback){
//         let extension = path.extname(file.originalname);
//         let basename = path.basename(file.originalname, extension);
//         callback(null, basename + "-" + Date.now() + extension);
//     }
// });

// const upload = multer({
//     storage: storage,
// });

router.post('', authMiddleware)
router.post('', controller.createBoard)

router.get('/:boardId', authMiddleware)
router.get('/:boardId', controller.getBoard)

// list
router.post('/:boardId/list', authMiddleware);
router.post('/:boardId/list', controller.createList);

// list, card seq
router.put('/:boardId/list/:listId/card/seq', authMiddleware)
router.put('/:boardId/list/:lisId/card/seq', controller.updateCardSequence);

router.put('/:boardId/list/seq', authMiddleware)
router.put('/:boardId/list/seq', controller.updateListSequence);


// card
router.post('/:boardId/list/:listId/card', authMiddleware)
router.post('/:boardId/list/:listId/card', controller.createCard);

router.get('/:boardId/card/:cardId', authMiddleware)
router.get('/:boardId/card/:cardId', controller.getCard);

router.put('/:boardId/card/:cardId/description', authMiddleware);
router.put('/:boardId/card/:cardId/description', controller.updateCardDescription);

router.put('/:boardId/card/:cardId/due_date', authMiddleware);
router.put('/:boardId/card/:cardId/due_date', controller.updateCardDueDate);

// check list

router.post('/:boardId/card/:cardId/checklist', authMiddleware);
router.post('/:boardId/card/:cardId/checklist', controller.createChecklist);

router.delete('/:boardId/card/:cardId/checklist/:checklistId', authMiddleware);
router.delete('/:boardId/card/:cardId/checklist/:checklistId', controller.deleteChecklist);

router.get('/:boardId/card/:cardId/checklist', authMiddleware);
router.get('/:boardId/card/:cardId/checklist', controller.getChecklist);

// check list item
router.post('/:boardId/checklist/:checklistId', authMiddleware);
router.post('/:boardId/checklist/:checklistId', controller.createChecklistItem);

router.put('/:boardId/checklist_item/:itemId', authMiddleware);
router.put('/:boardId/checklist_item/:itemId', controller.updateChecklistItem);

router.delete('/:boardId/checklist_item/:itemId', authMiddleware);
router.delete('/:boardId/checklist_item/:itemId', controller.deleteChecklistItem);


// comment
router.post('/:boardId/card/:cardId/comment', authMiddleware);
router.post('/:boardId/card/:cardId/comment', controller.createComment);

router.delete('/:boardId/comment/:commentId', authMiddleware);
router.delete('/:boardId/comment/:commentId', controller.deleteComment);

// labels
router.put('/:boardId/card/:cardId/labels/:labelId', authMiddleware);
router.put('/:boardId/card/:cardId/labels/:labelId', controller.updateCardLabel);

router.get('/:boardId/labels', authMiddleware);
router.get('/:boardId/labels', controller.getAllLabels);

// router.post('', authMiddleware)
// router.post('', upload.array('files'))
// router.post('', controller.post)

// router.delete('/:id', authMiddleware)
// router.delete('/:id', controller.deletePost);

module.exports = router
