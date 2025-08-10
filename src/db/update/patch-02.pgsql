-- vim: foldmethod=syntax:foldlevel=1
begin;
    set role ogalerie_admin;

    -- artwork / collection_id

    alter table artwork
    drop constraint artwork_collection_id_fkey ;

    alter table artwork
    add constraint artwork_collection_id_fkey
    foreign key (collection_id) references collection(id)
    on delete cascade;

    alter table artwork
    alter column collection_id
    set not null ;

    -- artwork / person_id

    alter table artwork
    drop constraint artwork_person_id_fkey ;

    alter table artwork
    add constraint artwork_person_id_fkey
    foreign key (person_id) references person(id)
    on delete cascade ;

    alter table artwork
    alter column person_id
    set not null ;

    -- appraise / artwork_id

    alter table appraise
    drop constraint appraise_artwork_id_fkey ;

    alter table appraise
    add constraint appraise_artwork_id_fkey
    foreign key (artwork_id) references artwork(id)
    on delete cascade ;

    -- appraise / person_id

    alter table appraise
    drop constraint appraise_person_id_fkey ;

    alter table appraise
    add constraint appraise_person_id_fkey
    foreign key (person_id) references person(id)
    on delete cascade ;

    -- mark

    alter table mark
    add unique(tag_id, artwork_id);

    -- mark / artwork_id

    alter table mark
    drop constraint mark_artwork_id_fkey ;

    alter table mark
    add constraint mark_artwork_id_fkey
    foreign key (artwork_id) references artwork(id)
    on delete cascade ;

    alter table mark
    alter column artwork_id
    set not null ;

    -- mark / tag_id

    alter table mark
    drop constraint mark_tag_id_fkey ;

    alter table mark
    add constraint mark_tag_id_fkey
    foreign key (tag_id) references tag(id)
    on delete cascade ;

    alter table mark
    alter column tag_id
    set not null ;

    -- art_comment / artwork_id

    alter table art_comment
    drop constraint art_comment_artwork_id_fkey ;

    alter table art_comment
    add constraint art_comment_artwork_id_fkey
    foreign key (artwork_id) references artwork(id)
    on delete cascade ;

    alter table art_comment
    alter column artwork_id
    set not null ;

    -- favorite / artwork_id

    alter table favorite
    drop constraint favorite_artwork_id_fkey ;

    alter table favorite
    add constraint favorite_artwork_id_fkey
    foreign key (artwork_id) references artwork(id)
    on delete cascade ;

    -- favorite / person_id

    alter table favorite
    drop constraint favorite_person_id_fkey ;

    alter table favorite
    add constraint favorite_person_id_fkey
    foreign key (person_id) references person(id)
    on delete cascade ;

    -- collection / person_id

    alter table collection
    drop constraint collection_person_id_fkey ;

    alter table collection
    add constraint collection_person_id_fkey
    foreign key (person_id) references person(id)
    on delete cascade ;

    alter table collection
    alter column person_id
    set not null ;

    -- moderate

    alter table moderate
    alter column person_id
    set not null ;

    -- moderate / artwork_id

    alter table moderate
    drop constraint moderate_artwork_id_fkey ;

    alter table moderate
    add constraint moderate_artwork_id_fkey
    foreign key (artwork_id) references artwork(id)
    on delete cascade ;

    -- moderate / comment_id

    alter table moderate
    drop constraint moderate_comment_id_fkey ;

    alter table moderate
    add constraint moderate_comment_id_fkey
    foreign key (comment_id) references art_comment(id)
    on delete cascade ;

    reset role;
commit;
