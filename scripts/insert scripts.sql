insert into genres values(1, 'Action');
insert into genres values(2, 'Drama');
insert into genres values(3, 'Romance');
insert into genres values(4, 'Science Fiction');
insert into genres values(5, 'Horror');
insert into genres values(6, 'Comedy');
insert into genres values(7, 'Thriller');
insert into genres values(8, 'Sports');

insert into languages values(1, 'Tamil');
insert into languages values(2, 'English');
insert into languages values(3, 'Hindi');
insert into languages values(4, 'Malayalam');
insert into languages values(5, 'Telugu');
insert into languages values(6, 'Kanada');
insert into languages values(7, 'Chinese');
insert into languages values(8, 'Korean');



insert into movies(name, releaseYear, genreId, languageId, story, createdBy, createdTimestamp, lastUpdtTimestamp, active) 
values('24', 2016, '4', '1', 'A scientist invents a time-travelling watch, which his evil twin brother wants to get hold of. Years later, the scientists son battles his uncle, who is still desperately in search of the watch.',
1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Y');

insert into ratings(movieId, likes, dislike, rating, totalRatings, createTimestamp) 
values('1','1', '0', 7.8, 1, CURRENT_TIMESTAMP);


insert into reviews(movieId, createdUserId, createdUserName, likeMovie, comments, rating, createTimestamp) values
(1, 1, 'Nijanthan', 'Y', 'Suriyas performance, Vikram Kumars brilliant handling and narration of a story with time travel as its core and the superlative visual experience outdo the shortcomings of 24. It is a must watch.', 7.8, CURRENT_TIMESTAMP);

insert into reviews(movieId, createdUserId, createdUserName, likeMovie, comments, rating, createTimestamp) values
(1, 2, 'Lokesh', 'Y', 'A script that is not simplistic or formulaic, but Suriya pulls it off admirably.', 7.2, CURRENT_TIMESTAMP);
