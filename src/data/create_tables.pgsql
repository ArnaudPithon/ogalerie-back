-- vim: foldmethod=syntax
begin;
    set role ogalerie_admin;

    -- On fait place nette avant de créer les tables

    drop table if exists
    tag, mark, artwork, art_comment, collection, moderate, appraise, favorite, person
    ;

    -- Contraintes / Types custom

    drop type if exists
    tag, category, ticket, situation
    ;

    create type sticker as enum (
        'peinture', 'dessin', 'aquarelle', 'sculpture', 'photographie',
        'toile', 'papier', 'bois', 'textile',
        'portrait', 'figuratif', 'paysage', 'abstrait',
        'autre'
    );
    create type category as enum ('type', 'support', 'style');
    create type ticket as enum ('alert', 'hide');
    create type situation as enum ('user', 'creator', 'admin');

    -- Création des tables

    -- Possibilité d'ajouter une contrainte d'unicité sur la paire name/category ?
    create table tag (
        id int generated always as identity primary key,
        name sticker not null,
        category category not null
    );

    create table person (
        id int generated always as identity primary key,
        firstname text,
        lastname text,
        nickname text unique not null,
        email text unique not null,
        hash text not null,
        birthday date not null,
        town text,
        country text,
        avatar text,
        situation situation not null,
        created_at timestamptz not null default now(),
        updated_at timestamptz
    );

    create table collection (
        id int generated always as identity primary key,
        title text not null,
        person_id int references person(id),
        created_at timestamptz not null default now(),
        updated_at timestamptz

    );

    create table artwork (
        id int generated always as identity primary key,
        title text not null,
        uri text unique not null,
        date date,
        description text not null,
        mature boolean,
        collection_id int references collection(id),
        person_id int references person(id),
        created_at timestamptz not null default now(),
        updated_at timestamptz
    );

    create table mark (
        tag_id int references tag(id),
        artwork_id int references artwork(id)
    );

    create table art_comment (
        id int generated always as identity primary key,
        content text not null,
        artwork_id int references artwork(id),
        person_id int references person(id),
        created_at timestamptz not null default now(),
        updated_at timestamptz
    );

    create table moderate (
        id int generated always as identity primary key,
        ticket ticket not null,
        message text not null,
        person_id int references person(id),
        artwork_id int references artwork(id),
        comment_id int references art_comment(id),
        created_at timestamptz not null default now(),
        updated_at timestamptz
    );

    create table appraise (
        artwork_id int references artwork(id),
        person_id int references person(id)
    );

    create table favorite (
        person_id int references person(id),
        artwork_id int references artwork(id),
        created_at timestamptz not null default now(),
        updated_at timestamptz
    );

    reset role;
commit;
