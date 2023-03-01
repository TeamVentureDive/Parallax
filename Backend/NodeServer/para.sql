drop database if exists para;
create database if not exists para;
use para;

set autocommit=0;

create table a_accounts (
a_username varchar(30) not null,
a_email varchar(30) not null,
a_password varchar(20) not null,
primary key(a_email)
);

create table f_files (
f_name varchar(30) not null,
f_a_email varchar(30) not null,
primary key(f_name)
);

create table f_friends (
f1_a_email varchar(30),
f2_a_email varchar(30) ,
primary key(f1_a_email, f2_a_email)
);

alter table f_files
add foreign key (f_a_email) references a_accounts(a_email) on delete restrict on update restrict;

alter table f_friends
add foreign key (f1_a_email) references a_accounts(a_email) on delete restrict on update restrict,
add foreign key (f2_a_email) references a_accounts(a_email) on delete restrict on update restrict;

commit;