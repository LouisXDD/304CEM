var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
    var fs, http, qs, server, url;
    http = require('http');
    url = require('url');
    qs = require('querystring');
    fs = require('fs');

    var loginStatus = false,
        loginUser = "";

    server = http.createServer(function(req, res) {
        var action, form, formData, msg, publicPath, urlData, stringMsg;
        urlData = url.parse(req.url, true);
        action = urlData.pathname;
        publicPath = __dirname + "\\public\\";
        console.log(req.url);



        if (action === "/Register") {
            console.log("Register");
            if (req.method === "POST") {
                console.log("action = post");
                formData = '';
                msg = '';
                return req.on('data', function(data) {
                    formData += data;
                    console.log("form data=" + formData);
                    return req.on('end', function() {
                        var user;
                        user = qs.parse(formData);
                        user.id = "0";
                        msg = JSON.stringify(user);
                        stringMsg = JSON.parse(msg);
                        var splitMsg = formData.split("&");

                        var tempSplitName = splitMsg[1];
                        var tempSplitPassword = splitMsg[2];

                        var splitName = tempSplitName.split("=");
                        var splitPassword = tempSplitPassword.split("=");
                        var searchDB = " Name:" + splitName[1];
                        var searchPW = " Password:" + splitPassword[1];
                        console.log("mess=" + msg);
                        console.log("mess=" + formData);
                        //console.log("split=" + msg[1]);
                        console.log("search=" + searchDB);
                        console.log("search=" + searchPW);

                        MongoClient.connect(dbUrl, function(err, db) {
                            var finalcount;
                            if (err) throw err;
                            var dbo = db.db("myWeb1");
                            var myobj = stringMsg;
                            console.log(user);
                            dbo.collection("user").count({ "name": splitName[1] }, function(err, count) {
                                console.log(err, count);
                                finalcount = count;
                                if (finalcount > 0) {
                                    if (err) throw err;
                                    console.log("user exist");
                                    db.close();
                                    return res.end("fail");

                                } else {
                                    console.log(myobj);
                                    dbo.collection("user").insertOne(myobj, function(err, result) {
                                        if (err) throw err;
                                        console.log("1 document inserted");
                                        loginStatus = true;
                                        loginUser = splitName[1];
                                        db.close();
                                        //return res.end(msg);
                                        return res.end("success");
                                    });

                                }
                            });
                        });
                    });
                });

            } else {
                //form = publicPath + "ajaxSignupForm.html";
                form = "Register.html";
                console.log("here");

                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
            }
        } else if (action === "/newpage") {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            return res.end("<h1>welcome to new page</h1><p><a href=\"/alexpage\">register</a></p>");
        } else if (action === "/login") {
            console.log("Login");
            if (req.method === "POST") {
                console.log("action = post");
                formData = '';
                msg = '';
                return req.on('data', function(data) {
                    formData += data;
                    console.log("form data=" + formData);
                    return req.on('end', function() {
                        var user;
                        user = qs.parse(formData);
                        user.id = "0";
                        msg = JSON.stringify(user);
                        stringMsg = JSON.parse(msg);
                        var splitMsg = formData.split("&");

                        var tempSplitName = splitMsg[1];
                        var tempSplitPassword = splitMsg[2];

                        var splitName = tempSplitName.split("=");
                        var splitPassword = tempSplitPassword.split("=");
                        var searchDB = " Name:" + splitName[1];
                        var searchPW = " Password:" + splitPassword[1];
                        console.log("mess=" + msg);
                        console.log("mess=" + formData);
                        //console.log("split=" + msg[1]);
                        console.log("search=" + searchDB);
                        console.log("search=" + searchPW);
                        MongoClient.connect(dbUrl, function(err, db) {
                            var finalcount;
                            if (err) throw err;
                            var dbo = db.db("myWeb1");
                            var myobj = stringMsg;
                            console.log(user);
                            dbo.collection("user").count({ "name": splitName[1] }, function(err, count) {
                                console.log(err, count);
                                finalcount = count;
                                console.log("myconut=" + count);
                                if (finalcount > 0) {
                                    var query = { "name": splitName[1] };
                                    dbo.collection("user").findOne(query, function(err, result) {
                                        if (err) throw err;
                                        var resultReturn = JSON.stringify(result);

                                        console.log(result);
                                        if (splitPassword[1] == result.password) {
                                            loginStatus = true;
                                            loginUser = splitName[1];

                                            console.log("Login success");
                                            db.close();
                                            return res.end("success");
                                        } else {

                                            console.log("Login failed");
                                            db.close();
                                            return res.end("wrongpassword");
                                        }
                                        db.close();




                                    });

                                } else {
                                    console.log("Login failed");
                                    db.close();
                                    //return res.end(msg);
                                    return res.end("fail");
                                }
                            });
                        });
                    });
                });
            } else {
                //form = publicPath + "ajaxSignupForm.html";
                form = "Login.html";
                console.log("here");

                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
            }
        } else if (action === "/Home") {
            console.log("Home");
            if (req.method === "POST") {
                console.log("action = post");
                formData = '';
                msg = '';
                return req.on('data', function(data) {
                    formData += data;
                    console.log("form data=" + formData);
                    return req.on('end', function() {
                        var user;
                        user = qs.parse(formData);
                        user.id = "0";
                        msg = JSON.stringify(user);
                        stringMsg = JSON.parse(msg);
                        var splitMsg = formData.split("&");

                        var tempSplitName = splitMsg[1];
                        var tempSplitPassword = splitMsg[2];

                        var splitName = tempSplitName.split("=");
                        var splitPassword = tempSplitPassword.split("=");
                        var searchDB = " Name:" + splitName[1];
                        var searchPW = " Password:" + splitPassword[1];
                        console.log("mess=" + msg);
                        console.log("mess=" + formData);
                        //console.log("split=" + msg[1]);
                        console.log("search=" + searchDB);
                        console.log("search=" + searchPW);
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Content-Length": msg.length
                        });
                    });
                });
            } else {
                //form = publicPath + "ajaxSignupForm.html";
                form = "Home.html";
                console.log("here");

                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
            }
        } else if (action === "/Member_page") {
            console.log("Member_page");
            if (req.method === "POST") {
                console.log("action = post");
                favlistData = '';
                fav = '';
                return req.on('data', function(data) {
                    favlistData += data;
                    console.log("favlist data=" + favlistData);
                    return req.on('end', function() {
                        var favlist;
                        favlist = qs.parse(favlistData);
                        fav = JSON.stringify(favlist);
                        console.log("fav" + fav);
                        stringFav = JSON.parse(fav);
                        var splitFav = favlistData.split("&");
                        console.log("splitFav=" + splitFav);
                        var tempSplitName = splitFav[1];

                        var tempSplitFavlist = splitFav[2];

                        var splitName = tempSplitName.split("=");
                        var splitFavlist = tempSplitFavlist.split("=");
                        console.log("mess=" + fav);

                        //console.log("split=" + msg[1]);
                        MongoClient.connect(dbUrl, function(err, db) {
                            var finalcount;
                            if (err) throw err;
                            var dbo = db.db("database");
                            console.log(favlist);
                            dbo.collection("user").count({ "name": splitName[1] }, function(err, count) {
                                finalcount = count;
                                console.log(finalcount);
                                if (finalcount < 1) {
                                    console.log("Not have this user");
                                    db.close();
                                    return res.end("fail");
                                } else {
                                    dbo.collection("favlist").insertOne({ "name": splitName[1], "favlist": splitFavlist[1] }, function(err, favres) {
                                        console.log("Data inserted");
                                        db.close();
                                        return res.end("OK");
                                    });
                                }
                            });
                            dbo.collection("favlist").findOne({ "name": splitName[1] }, function(err, result) {
                                if (err) throw err;
                                console.log(result);
                                db.close();
                            });
                        });
                    });
                });
            } else {
                //form = publicPath + "ajaxSignupForm.html";
                form = "Member_page.html";
                console.log("here");

                return fs.readFile(form, function(err, contents) {
                    if (err !== true) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        return res.end(contents);
                    } else {
                        res.writeHead(500);
                        return res.end;
                    }
                });
            }
        } else if (action === "/readfavourlist") {
            console.log("readfavourlist");
            var usernameData = '';
            if (req.method === "POST") {
                console.log("action = post");
                usernameData = '';
                user = '';
                return req.on('data', function(data) {
                    usernameData += data;
                    console.log("username data=" + usernameData);
                    return req.on('end', function() {
                        var username;
                        username = qs.parse(usernameData);
                        user = JSON.stringify(username);
                        stringUser = JSON.parse(user);
                        var splituser = usernameData.split("&");
                        var tempSplitName = splituser[1];
                        var splitName = tempSplitName.split("=");
                        console.log("mess=" + user);
                        console.log();
                        console.log("read favourite");
                        MongoClient.connect(dbUrl, function(err, db) {
                            var finalcount;
                            if (err) throw err;
                            var dbo = db.db("myWeb1");
                            dbo.collection("favlist").find({ "name": splitName[1] }).toArray(function(err, result) {
                                if (err) throw err;
                                console.log("result" + result);
                                db.close();
                                var resultReturn = JSON.stringify(result);
                                console.log("resultReturn" + resultReturn);
                                return res.end(resultReturn);
                            });
                        });
                    });
                });
            }
        } else if (action === "/addfavourlist") {
            console.log("addfavourlist");
            var userData = '';
            if (req.method === "POST") {
                console.log("action = post");
                gameData = '';
                game = '';
                return req.on('data', function(data) {
                    userData += data;
                    console.log("username data=" + userData);
                    return req.on('end', function() {
                        var gameData;
                        gameData = qs.parse(userData);
                        game = JSON.stringify(gameData);
                        stringData = JSON.parse(game);

                        var gameName = stringData.gameName;
                        var gameImg = stringData.image;
                        var gameVideo = stringData.video;
                        var gameGenres = stringData.genres;
                        var gamePlatforms = stringData.platforms;

                        var splitGenres = gameGenres.split("-");
                        var splitPlatforms = gamePlatforms.split("-");


                        console.log("mess=" + splitGenres);
                        console.log();
                        console.log("add favourite");

                        if (loginStatus) {
                            MongoClient.connect(dbUrl, function(err, db) {
                                var finalcount;
                                if (err) throw err;
                                var dbo = db.db("myWeb1");
                                dbo.collection("favlist").count({ "name": loginUser, "gameName": gameName }, function(err, count) {
                                    console.log("name " + loginUser + " gameName " + gameName);
                                    if (err) throw err;
                                    finalcount = count;
                                    console.log("myconut=" + count);
                                    if (finalcount > 0) {
                                        console.log("the data has been inserted");
                                        db.close();
                                        return res.end("inserted");
                                    } else {
                                        var myobj = { "name": loginUser, "gameName": gameName, "gameImg": gameImg, "gameVideo": gameVideo, "gameGenres": splitGenres, "gamePlatforms": splitPlatforms };
                                        console.log(myobj);
                                        dbo.collection("favlist").insertOne(myobj, function(err, result) {
                                            if (err) throw err;
                                            console.log("1 document inserted");

                                            db.close();
                                            //return res.end(msg);
                                            return res.end("success");
                                        });
                                    }


                                    //var resultReturn = JSON.stringify(result);
                                    // console.log("resultReturn" + resultReturn);
                                    // return res.end(resultReturn);
                                });
                            });
                        } else {
                            console.log("loginStage is false");
                            return res.end("noLogin");
                        }

                    });
                });
            }
        } else if (action === "/removefavourlist") {
            if (req.method === "POST") {
                console.log("action = post");
                gameData = '';
                delfav = '';
                return req.on('data', function(data) {
                    gameData += data;
                    console.log("data=" + gameData);
                    return req.on('end', function() {
                        var delfavlist;
                        delfavlist = qs.parse(gameData);
                        delfav = JSON.stringify(delfavlist);
                        console.log("delfav" + delfav);
                        stringdelfav = JSON.parse(delfav);

                        MongoClient.connect(dbUrl, function(err, db) {
                            if (err) throw err;
                            var dbo = db.db("myWeb1");
                            dbo.collection("favlist").remove({ "name": loginUser, "gameName": stringdelfav.gameName }, function(err, obj) {
                                if (err) throw err;
                                console.log("1 document deleted");
                                db.close();
                                return res.end("success");
                            });

                        });
                    });
                });
            }
        } else if (req.url === "/logincheck") {

            //check Login
            if (loginStatus) {
                res.end("success");
            } else {
                res.end("fail");
            }
        } else {
            //handle redirect
            if (req.url === "/index") {
                sendFileContent(res, "index.html", "text/html");
            } else if (req.url === "/Signuppage") {
                sendFileContent(res, "signuppage.html", "text/html");
            } else if (req.url === "/loginpage") {
                sendFileContent(res, "loginpage.html", "text/html");
            } else if (req.url === "/logout") {
                loginStatus = false;
                loginUser = "";
                sendFileContent(res, "index.html", "text/html");
            } else if (req.url === "/reviewlogout") {
                loginStatus = false;
                loginUser = "";
                sendFileContent(res, "review.html", "text/html");
            } else if (req.url === "/review") {
                sendFileContent(res, "review.html", "text/html");
            } else if (req.url === "/myProfile") {
                if (loginStatus) {
                    sendFileContent(res, "myProfile.html", "text/html");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write('<h4>Worng Way to access the user datas</h4>');
                }

            } else if (req.url === "/hklawprivacy") {
                sendFileContent(res, "text_hklawprivacy.html", "text/html");
            } else if (req.url === "/protectdata") {
                sendFileContent(res, "text_protectdata.html", "text/html");
            } else if (req.url === "/socialnetwork") {
                sendFileContent(res, "text_socialnetwork.html", "text/html");
            } else if (req.url === "/favlistpage") {
                sendFileContent(res, "favouritelistpage.html", "text/html");
            } else if (req.url === "/abuse") {
                sendFileContent(res, "article4.html", "text/html");
            } else if (req.url === "/manage") {
                sendFileContent(res, "article3.html", "text/html");
            } else if (req.url === "/use") {
                sendFileContent(res, "article2.html", "text/html");
            } else if (req.url === "/food") {
                sendFileContent(res, "article1.html", "text/html");
            } else if (req.url === "/") {
                console.log("Requested URL is url" + req.url);
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write('<b>testpage</b><br /><br />This is the default response.');
            } else if (/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/javascript");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/css");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/jpg");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/mp4");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/ico");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/ttf");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/woff");
            } else if (/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/png");
            } else {
                console.log("Requested URL is: " + req.url);
                res.end();
            }
        }
    });

    server.listen(9999);

    console.log("Server is running，time is" + new Date());


    function sendFileContent(response, fileName, contentType) {
        fs.readFile(fileName, function(err, data) {
            if (err) {
                response.writeHead(404);
                response.write("Not Found!");
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.write(data);
            }
            response.end();
        });
    }
}).call(this);