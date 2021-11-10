create table Activity(
    id bigint,
    name varchar,
    description varchar,
    start timestamp,
    finish timestamp,
    event_id bigint
);
CREATE SEQUENCE activity_seq START 1;