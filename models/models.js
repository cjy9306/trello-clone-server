const Schema = require('./schema')

const sequelize = Schema.Sequelize;
const Board = Schema.Board;
const List = Schema.List;
const Card = Schema.Card;
const Member = Schema.Member;
const BoardMember = Schema.BoardMember;
const Team = Schema.Team;
const TeamMember = Schema.TeamMember;
const CheckList = Schema.CheckList;
const CheckListItem = Schema.CheckListItem;
const Comment = Schema.Comment;
const Labels = Schema.Labels;
const CardLabels = Schema.CardLabels;

module.exports = {
    sequelize,
    Board,
    List,
    Card,
    Member,
    BoardMember,
    Team,
    TeamMember,
    CheckList,
    CheckListItem,
    Comment,
    Labels,
    CardLabels,
}