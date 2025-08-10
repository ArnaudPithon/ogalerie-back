-- vim: foldmethod=syntax:foldlevel=1
begin;
    set role ogalerie_admin;

    -- art_comment / person_id

    alter table art_comment
    drop constraint art_comment_person_id_fkey ;

    alter table art_comment
    add constraint art_comment_person_id_fkey
    foreign key (person_id) references person(id)
    on delete cascade ;

    alter table art_comment
    alter column person_id
    set not null ;

    reset role;
commit;
