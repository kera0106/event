create table events_accounts(
    account_id bigint,
    event_id bigint,
    is_author boolean not null
);