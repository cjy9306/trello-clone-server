
use trello;

drop table comment;
drop table checklist_item;
drop table checklist;
drop table card_member;
drop table card_labels;
drop table labels;
drop table card;
drop table list;
drop table board_member;
drop table board;
drop table team_member;
drop table team;
drop table members;

create table members(
member_id int primary key auto_increment,
username varchar(32) not null,
password varchar(200),
name varchar(64),
birth_day date,
gender varchar(6) check ( gender in ('male', 'female') ),
email varchar(100) unique,
phone varchar(32),
status varchar(10),
email_verification bool,
social_login_provider text
);

select * from members;

create table team (
team_id int primary key auto_increment,
team_name varchar(128),
description text,
create_time timestamp
);


select * from team;

create table team_member(
team_id int,
member_id int,
constraint tm_team_id foreign key(team_id) references team(team_id) on delete cascade on update cascade,
constraint tm_member_id foreign key(member_id) references members(member_id) on delete cascade on update cascade
);

select * from team_member;

create table board (
board_id int primary key auto_increment,
board_name varchar(32),
public_scope varchar(10),
member_id int,
team_id int,
create_time timestamp,
background_color varchar(6),
constraint board_member_fk foreign key(member_id) references members(member_id) on delete cascade on update cascade,
constraint board_team_fk foreign key(team_id) references team(team_id) on delete cascade on update cascade
);

create table board_member (
board_id int not null,
member_id int not null,
role varchar(10),
constraint bm_board_fk foreign key(board_id) references board(board_id) on delete cascade on update cascade,
constraint bm_member_fk foreign key(member_id) references members(member_id) on delete cascade on update cascade
);

select * from board_member;

create table list (
list_id int primary key auto_increment,
board_id int not null,
list_name varchar(32),
seq int,
create_time timestamp,
constraint list_board_fk foreign key(board_id) references board(board_id) on delete cascade on update cascade
);

select * from list;

create table card (
card_id int primary key auto_increment,
list_id int not null,
card_name varchar(32),
seq int,
description text,
due_date timestamp,
constraint card_list_fk foreign key(list_id) references list(list_id) on delete cascade on update cascade
);

create table card_member (
card_id int not null,
member_id int not null,
constraint cm_card_fk foreign key(card_id) references card(card_id) on delete cascade on update cascade,
constraint cm_member_fk foreign key(member_id) references members(member_id) on delete cascade on update cascade
);

select * from card_member;

create table checklist (
checklist_id int primary key auto_increment,
card_id int not null,
checklist_name varchar(32),
seq int,
constraint cl_card_fk foreign key(card_id) references card(card_id) on delete cascade on update cascade
);


select * from checklist;

create table checklist_item (
item_id int primary key auto_increment,
checklist_id int not null,
item_name varchar(128),
seq int,
checked boolean,
constraint cli_checklist_fk foreign key(checklist_id) references checklist(checklist_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

select * from checklist_item;

create table comment (
comment_id int primary key auto_increment,
card_id int not null,
member_id int not null,
contents text,
create_time timestamp,
modify_time timestamp,
constraint comment_card_fk foreign key(card_id) references card(card_id) on delete cascade on update cascade,
constraint comment_member_fk foreign key(member_id) references members(member_id) on delete cascade on update cascade
);

select * from comment;

create table labels (
label_id int primary key auto_increment,
label_name varchar(128),
color varchar(30)
);

insert into labels values(0, 'priority', '#ff5542');
insert into labels values(0, 'important', '#3c779f');
insert into labels values(0, 'review', '#fb9a29');
insert into labels values(0, 'need design', '#52bb70');

select * from labels;

create table card_labels (
card_id int,
label_id int,
constraint label_card_fk foreign key(card_id) references card(card_id) on delete cascade on update cascade,
constraint label_fk foreign key(label_id) references labels(label_id) on delete cascade on update cascade
);

select * from card_labels;

