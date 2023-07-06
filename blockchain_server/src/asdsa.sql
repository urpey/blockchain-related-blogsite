select "articles_version"."title",
    "users"."username" as "author",
    "editors"."username" as "editor",
    "ref_site",
    "content"
from "articles_version"
    inner join "articles" on "article_id" = "articles"."id"
    inner join "users" on "articles"."author_id" = "users"."id"
    inner join "editors" on "articles_version"."editor_id" = "editors"."id"
where "articles_version"."approved_at" is not null
    and "articles_version"."id" in (
        select max("articles_version"."id")
        from "articles_version"
        where "articles_version"."article_id" = ?
    ) -- limit ?
    -- update articles_version
    -- set editor_id = 1
    -- where id = 6;
    -- update articles_version
    -- set approved_at = now()
    -- where id = 6;
    -- select "articles_version"."title",
    --     "users"."username" as "author",
    --     "editors"."username" as "editor",
    --     "ref_site",
    --     "content"
    -- from "articles_version"
    --     inner join "articles" on "article_id" = "articles"."id"
    --     inner join "users" on "articles"."author_id" = "users"."id"
    --     left join "editors" on "articles_version"."editor_id" = "editors"."id"
    -- where "articles_version"."id" = 12
    --     and "articles_version"."article_id" = 13;


select "articles_version"."title",
    "users"."username" as "author",
    "editors"."username" as "editor",
    "ref_site",
    "content"
from "articles_version"
    inner join "articles" on "article_id" = "articles"."id"
    inner join "users" on "articles"."author_id" = "users"."id"
    inner join "editors" on "articles_version"."editor_id" = "editors"."id"
where "articles_version"."approved_at" is not null
    and "articles_version"."id" in (
        select max("articles_version"."id")
        from "articles_version"
        where "articles_version"."article_id" = 18)