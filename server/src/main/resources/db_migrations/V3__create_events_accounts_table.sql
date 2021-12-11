create table events_accounts(
    account_id bigint,
    event_id bigint,
    is_author boolean not null,
    is_manager boolean not null,
    is_writer boolean not null,
    is_accepted boolean not null
);