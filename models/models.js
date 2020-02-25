const Sequelize = require('sequelize')
const config = require('../config/environment').db_environments

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: config.mysql.dialect,
        logging: false,
        define: {
            freezeTableName: true,
        }
    }
)

class Members extends Sequelize.Model{}
Members.init({
    member_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    birth_day: Sequelize.DATE,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    status: Sequelize.STRING,
    email_verification: Sequelize.BOOLEAN,
    social_login_provider: Sequelize.TEXT,
}, { sequelize: sequelize, modelName: 'members', timestamps: false});

class Team extends Sequelize.Model{}
Team.init({
    team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    team_name: Sequelize.STRING,
    description: Sequelize.STRING,
    create_time: Sequelize.DATE,
}, { sequelize: sequelize, modelName: 'team', timestamps: false});

class TeamMember extends Sequelize.Model{}
TeamMember.init({
    team_id: Sequelize.INTEGER,
    member_id: Sequelize.INTEGER,
}, { sequelize: sequelize, modelName: 'team_member', timestamps: false});

class Board extends Sequelize.Model{}
Board.init({
    board_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    board_name: Sequelize.STRING,
    public_scope: Sequelize.STRING,
    member_id: Sequelize.INTEGER,
    team_id: Sequelize.INTEGER,
    create_time: Sequelize.DATE,
    background_color: Sequelize.STRING,
}, { sequelize: sequelize, modelName: 'board', timestamps: false});

class BoardMember extends Sequelize.Model{}
BoardMember.init({
    board_id: Sequelize.INTEGER,
    member_id: Sequelize.INTEGER,
    role: Sequelize.TEXT,
}, { sequelize: sequelize, modelName: 'board_member', timestamps: false});

class List extends Sequelize.Model{}
List.init({
    list_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    board_id: Sequelize.INTEGER,
    list_name: Sequelize.STRING,
    seq: Sequelize.INTEGER,
    create_time: Sequelize.DATE,
}, { sequelize: sequelize, modelName: 'list', timestamps: false});

class Card extends Sequelize.Model{}
Card.init({
    card_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    list_id: Sequelize.INTEGER,
    card_name: Sequelize.STRING,
    seq: Sequelize.INTEGER,
    description: Sequelize.STRING,
    due_date: Sequelize.DATE,
}, { sequelize: sequelize, modelName: 'card', timestamps: false});

class CheckList extends Sequelize.Model{}
CheckList.init({
    checklist_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    card_id: Sequelize.INTEGER,
    checklist_name: Sequelize.STRING,
    seq: Sequelize.INTEGER,
}, { sequelize: sequelize, modelName: 'checklist', timestamps: false});

class CheckListItem extends Sequelize.Model{}
CheckListItem.init({
    item_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    checklist_id: Sequelize.INTEGER,
    item_name: Sequelize.STRING,
    seq: Sequelize.INTEGER,
    checked: Sequelize.BOOLEAN,
},  { sequelize: sequelize, modelName: 'checklist_item', timestamps: false});

class Comment extends Sequelize.Model{}
Comment.init({
    comment_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    card_id: Sequelize.INTEGER,
    member_id: Sequelize.INTEGER,
    contents: Sequelize.STRING,
    create_time: Sequelize.DATE,
    modify_time: Sequelize.DATE,
},  { sequelize: sequelize, modelName: 'comment', timestamps: false});

class Labels extends Sequelize.Model{}
Labels.init({
    label_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    label_name: Sequelize.STRING,
    color: Sequelize.STRING,
},  { sequelize: sequelize, modelName: 'labels', timestamps: false});

class CardLabels extends Sequelize.Model{}
CardLabels.init({
    card_id: Sequelize.INTEGER,
    label_id: Sequelize.INTEGER,
},  { sequelize: sequelize, modelName: 'card_labels', timestamps: false});


// constraints
Members.removeAttribute('id');
Team.removeAttribute('id');
TeamMember.removeAttribute('id');
Board.removeAttribute('id');
List.removeAttribute('id')
Card.removeAttribute('id');
CheckList.removeAttribute('id');
CheckListItem.removeAttribute('id');
Comment.removeAttribute('id');
Labels.removeAttribute('id');
CardLabels.removeAttribute('id');

// board
Board.hasMany(List, {foreignKey: 'board_id', sourceKey: 'board_id', onDelete: 'cascade'});
List.belongsTo(Board, {foreignKey: 'board_id', sourceKey: 'board_id'});

Team.hasMany(Board, {foreignKey: 'team_id', sourceKey: 'team_id', onDelete: 'cascade'});
Board.belongsTo(Team, {foreignKey: 'team_id', sourceKey: 'team_id'});

Members.hasMany(Board, {foreignKey: 'member_id', sourceKey: 'member_id', onDelete: 'cascade'});
Board.belongsTo(Members, {foreignKey: 'member_id', sourceKey: 'member_id'});

Board.belongsToMany(Members, {through: 'board_member', foreignKey:'board_id'});
Members.belongsToMany(Board, {through: 'board_member', foreignKey:'member_id'});

Team.belongsToMany(Members, {through: 'team_member', foreignKey: 'team_id'});
Members.belongsToMany(Team, {through: 'team_member', foreignKey: 'member_id'});

// list
List.hasMany(Card, {foreignKey: 'list_id', sourceKey: 'list_id', onDelete: 'cascade'});
Card.belongsTo(List, {foreignKey: 'list_id', sourceKey: 'list_id'});

// checklist
Card.hasMany(CheckList, {foreignKey: 'card_id', sourceKey: 'card_id', onDelete: 'cascade'});
CheckList.belongsTo(Card, {foreignKey: 'card_id', sourceKey: 'card_id'});

CheckList.hasMany(CheckListItem, {foreignKey: 'checklist_id', sourceKey: 'checklist_id', onDelete: 'cascade'});
CheckListItem.belongsTo(CheckList, {foreignKey: 'checklist_id', sourceKey: 'checklist_id'});

// comment
Card.hasMany(Comment, {foreignKey: 'card_id', sourceKey: 'card_id', onDelete: 'cascade'});
Comment.belongsTo(Card, {foreignKey: 'card_id', sourceKey: 'card_id'})

Members.hasMany(Comment, {foreignKey: 'member_id', sourceKey: 'member_id', onDelete: 'cascade'});
Comment.belongsTo(Members, {foreignKey: 'member_id', sourceKey: 'member_id'});

Card.belongsToMany(Labels, {through: 'card_labels', foreignKey: 'card_id'});
Labels.belongsToMany(Card, {through: 'card_labels', foreignKey: 'label_id'});


module.exports = {
    sequelize,
    Board,
    List,
    Card,
    Members,
    BoardMember,
    Team,
    TeamMember,
    CheckList,
    CheckListItem,
    Comment,
    Labels,
    CardLabels,
}