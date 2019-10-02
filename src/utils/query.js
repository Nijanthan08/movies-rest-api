const QUERY_ALL_LANGUAGES = "Select * from languages";

const QUERY_ALL_GENRES = "Select * from genres";

const QUERY_ALL_MOVIES = `select m.id, m.name, m.releaseYear, g.name genre, l.name language, m.story, 
                            m.base64Img, r.rating, m.createdTimestamp 
                            from Movies m
                            join genres g on m.genreId=g.id
                            join languages l on m.languageId=l.id
                            left join ratings r on m.id=r.movieId where m.active='Y'`;

const QUERY_POPULAR_MOVIES = `select m.id, m.name, m.releaseYear, g.name genre, l.name language, m.story, 
                              m.base64Img, r.likes, r.dislike, r.rating, r.totalRatings, m.createdTimestamp 
                              from Movies m
                              join genres g on m.genreId=g.id
                              join languages l on m.languageId=l.id
                              join ratings r on m.id=r.movieId where m.active='Y'
                              order by r.rating desc`;

const QUERY_MOVIE_BY_ID = `select m.id, m.name, m.releaseYear, g.name genre, l.name language, m.story,
                            m.base64Img, r.rating, r.likes, r.dislike, r.createTimestamp
                            from Movies m
                            join genres g on m.genreId=g.id
                            join languages l on m.languageId=l.id
                            left join ratings r on m.id=r.movieId
                            where m.id=@movieId and m.active='Y'`;

const QUERY_REVIEWS_BY_MOVIEID = `Select * from reviews where movieId=@movieId`;

const insertMovie = movie => {
  return `insert into movies(name, releaseYear, genreId, languageId, story, createdBy, active, 
    createdTimestamp, lastUpdtTimestamp, base64Img) values('${movie.name}', ${movie.releaseYear}, 
    ${movie.genreId}, ${movie.languageId}, '${movie.story}', ${movie.createdBy}, '${movie.active}', 
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${movie.base64Img}')`;
};

const delMovie = id => {
  return `update movies set active='N' where id=${id}`;
};

const updtMovie = movie => {
  return `update movies set name='${movie.name}', releaseYear=${movie.releaseYear}, genreId=${movie.genreId}, 
  languageId=${movie.languageId}, story='${movie.story}', lastUpdtTimestamp=CURRENT_TIMESTAMP 
  where id=${movie.id}`;
};

const insertUser = user => {
  return `insert into users(firstName, lastName, emailId, password, admin, active, createdTimestamp) values
  ('${user.firstName}', '${user.lastName}', '${user.emailId}', '${user.password}', 'N', 'Y',
   CURRENT_TIMESTAMP)`;
};

const selectUser = emailId => {
  return `select * from users where emailId='${emailId}' and active='Y'`;
};

const insertReview = review => {
  return `insert into reviews(movieId, createdUserId, createdUserName, likeMovie, comments, rating, 
    createTimestamp) values(${review.movieId}, ${review.createdUserId}, '${review.createdUserName}',
     '${review.likeMovie}', '${review.comments}', ${review.rating}, CURRENT_TIMESTAMP)`;
};

const insertRating = (movieId, like) => {
  if ("Y" === like)
    return `insert into ratings(movieId, likes, dislike, totalRatings, createTimestamp) 
            values(${movieId}, 1, 0, 1, CURRENT_TIMESTAMP)`;
  else
    return `insert into ratings(movieId, likes, dislike, totalRatings, createTimestamp) 
            values(${movieId}, 0, 1, 1, CURRENT_TIMESTAMP)`;
};

const updtRating = (movieId, like) => {
  if ("Y" === like)
    return `update ratings set likes = likes + 1, totalRatings = totalRatings + 1 where movieId = ${movieId}`;
  else
    return `update ratings set dislike = dislike + 1, totalRatings = totalRatings + 1 where movieId = ${movieId}`;
};

const QUERY_RATING_BY_MOVIEID = "Select * from ratings where movieId=@movieId";

module.exports = {
  QUERY_ALL_LANGUAGES,
  QUERY_ALL_GENRES,
  QUERY_ALL_MOVIES,
  QUERY_MOVIE_BY_ID,
  QUERY_REVIEWS_BY_MOVIEID,
  QUERY_POPULAR_MOVIES,
  insertMovie,
  delMovie,
  updtMovie,
  insertUser,
  selectUser,
  insertReview,
  QUERY_RATING_BY_MOVIEID,
  insertRating,
  updtRating
};
