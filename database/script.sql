create database apiGenerator;

create table apis (
	id char(36) primary key,
	name varchar(64) not null,
	slug varchar(64) not null,
	description text,
	isPrivate bool not null,
	creationDate timestamp,
	lastModification timestamp
);

create table resources (
	id char(36) primary key,
	name varchar(64) not null,
	slug varchar(64) not null,
	description text,
	apiId char(36) not null,
	isBulkRemovable bool not null,
    tableCode char(33) not null,
	creationDate timestamp,
	lastModification timestamp,
	
	foreign key (apiId) references apis (id)
);

create table types (
	id serial primary key,
	name varchar(16) unique not null
);

create table properties (
	id char(36) primary key,
	name varchar(64) not null,
	typeId int not null,
	resourceId char(36),
	isKey bool not null,
	isNullable bool not null,
	defaultValue text,
	referencedKeyId char(64),
	creationDate timestamp,
	lastModification timestamp,
	
	foreign key (typeId) references types (id),
	foreign key (resourceId) references resources (id),
	foreign key (referencedKeyId) references properties (id)
);

-- Resources schema
create schema resources;