/**

OPTIMIZE THIS CODE

TODO:
    - Fix error on a webpage, line 246 - 249
    - Hover over program link shows its info, like created/updated, flags. Would be convenient.
    - Make a beta file and normal file to avoid confusing them.
    - Video info.
    - Emoji picker, maybe link it in. Research for a good one, like Discord.
    - Math symbols in discussion, LaTeX.
    - KAID getter, show KAID next to username.
    - Dark mode
    - On HL, hovering over name shows profile card.
    - Downvote button
    - Hovering over user name also shows their streak.
    - Add search function on Top List to search for your program with the ID, use DY's code?
        - Have submit button inside box, but on the right, when clicked it sends API request.
        - Have HL and TL position under program title
    
**/


var programUrl = 'https://www.khanacademy.org/api/internal/show_scratchpad?scratchpad_id=';
var userApi = 'https://www.khanacademy.org/api/internal/user/profile?username=';
var userProgramsApi = 'https://www.khanacademy.org/api/internal/user/scratchpads?username=';

var url = window.location.href.split('/');

var userInfo = {};
var programData = {};
var userPrograms = {};
//var _KA = window.KA;

if (url[3] === 'computer-programming') {
    var programId = url[5].substring(0, 16); /*** Not all IDs are 16 chars long, check this. ***/
    $.getJSON(programUrl + programId, function(data){
        console.log(data);
        programData = data;
    });
}

if (url[3] === 'profile') {
    var username = url[4];
    $.getJSON(userProgramsApi + username +'&limit=1000',function(data){
        console.log(data);
       	userPrograms = data;
    });
    $.getJSON(userApi + username, function(data){
        console.log(data);
        userInfo = data;
    });
}

function DomIsLoaded() {
    return document.readyState === 'complete';
}

function newDate(date) {
    var d = new Date(date);
    return (("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2));
}

/*** Display exercise data and streak data. ***/

/*

If a 'get data' button is clicked, display info but still keep button. 

var path1 = window.location.href.split('/')[6],
path2 = window.location.href.split('/')[8],
title = document.getElementsByClassName('title_k2aiyo')[0],
quizUrl = path1 + '/' + path2,
submit = document.getElementsByClassName('phoneButton_uyzc1g-o_O-phoneCheckButton_1q37j08')[0],
newDate = function(date) {
    var d = new Date(date);
    return (("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear());
}
$.getJSON("https://www.khanacademy.org/api/internal/user/topic/" + quizUrl + "/cards/begin?casing=camel&stopCardPersist=1&lang=en&_=Date.now()", function(data) {
    var a = data.userExercises[0].exerciseModel.authorName,
    c = newDate(data.userExercises[0].exerciseModel.creationDate),
    speed = data.userExercises[0].exerciseModel.secondsPerFastProblem,
    streak = data.userExercises[0].streak;

    title.innerHTML = '<br>' + 'Author: ' + a + ' - Created: ' + c + ' - Speed: ' + speed + ' Seconds - Streak: ' + streak;
});
}
*/


/*** Add edit feature. ***/
function editComments() {
    var nick = document.getElementsByClassName('trigger_n8otci')[0],
    where = document.cookie.substr(document.cookie.indexOf("fkey=") + 5, 31),
    comments = document.getElementsByClassName('discussion-item reply'),
    authors = document.getElementsByClassName('author-nickname discussion-author'), i = 0;

    for (; i < authors.length; i++) {
        var a = authors[i].childNodes[4].textContent.trim();
        console.log(a);
        if (a == nick.textContent) {
           console.log(nick.textContent + ' is ' + a);
        }
        // use return maybe
    }
        
        //var meta = comments[i].children[1].children[0],
        //commentIds = comments[i].id;
        //meta.innerHTML += "<span class='discussion-meta-separator'>•</span><span class='mod-tools' data-key=" + commentIds + "data-is-author='true' data-in-queue=''><a href='javascript:void(0);' class='edit'>Edit</a></span>";
        //console.log(meta.innerHTML);
        //console.log(comments.length);
    //}
    //document.cookie;
    //console.log(nick.textContent + ', ' + where);

    clearInterval(EditComments);
};


/*** Reveals hidden info on Zendesk articles **/
function updateArticle() {
	var comments = document.getElementsByClassName('article-comments')[0];
	comments.style.display = 'block';

	var author = document.getElementsByClassName('article-meta')[0];
	author.style.display = 'block';
	//author.outerText += ' created this article.';

	clearInterval(UpdateArticle);
};

/*
var meta = document.getElementsByClassName('discussion-meta-controls'),
comments = document.getElementsByClassName('replies'),
i;

for (i = 0; i < comments.length; i++) {
    //console.log(comments[i].innerHTML);
    
    var meta = comments[i].children[0].children[1].children[0],
    commentIds = comments[i].id;
    meta.innerHTML += "<span class='discussion-meta-separator'>•</span><span class='mod-tools' data-key=" + commentIds + "data-is-author='true' data-in-queue=''><a href='javascript:void(0);' class='edit'>Edit</a></span>";
    console.log(comments.length);
}


    javascript:(function() {
    var where = KAdefine._moduleCache["javascript/discussion-package/discussion.js"].exports.data;
    var els = document.getElementsByClassName("reply");

    if (window.location.href.indexOf("khanacademy.org") < 0 || !where.focusKind || els.length === 0) {
       alert("Use on a Khan Academy page with comments.");
       return;
    }

    alert("1. Click the comment/reply you want to edit. 2. Enter text. 3. The page will be automatically reloaded upon success. If anything doesn't work, please let me (Matthias) know.");

    var editSuccess = function () {
       window.location.reload();
    };

    var mEditComment = function() {
       var input = prompt("What do you want the edited comment to say?", this.getElementsByClassName("discussion-content")[0].innerText);
       if (input === "") return;
       var req = new XMLHttpRequest();
       req.addEventListener("load", editSuccess);
       req.open("PUT", "https://www.khanacademy.org/api/internal/discussions/" + where.focusKind + "/" + where.focusId + "/comments/" + this.id);
       req.setRequestHeader("Content-Type","application/json");
       req.setRequestHeader("X-KA-FKey", document.cookie.substr(document.cookie.indexOf("fkey=") + 5, 31));
       req.send('{"text":' + JSON.stringify(input) + '}');
    };

    for (var i = 0; i < els.length; i++) {
       els[i].addEventListener("click", mEditComment);
    }
    })()
*/

/*** When notifications are more than 9, it will show the real value and not 9+ anymore. ***/
function updateNotifs() {
    var dropdown = document.getElementsByClassName('switchText_1lh86m9')[0].childNodes[5];
    var greenCircle = document.getElementsByClassName('notificationsBadge_16g2pyz')[0];

    // If greenCircle.innerHTML > 9, replace with dropdown number.
    if (greenCircle && greenCircle.textContent === '9+') {
        greenCircle.textContent = dropdown.textContent;
    }
    clearInterval(notifications);
};

/***  Programs no longer have a max width. ***/
function widenProgram() {
    let s = document.getElementsByClassName('wrap_xyqcvi')[0];
    s.style.setProperty("max-width", "none", "important");

    clearInterval(widenprogram);
};

/*** When viewing a program, it shows how many flags the program has. ***/
function addFlagsToProgram() {

    // TESTING

    if (programData.creatorProfile.nickname && programData.scratchpad.kaid !== KA._userProfileData.kaid) {
       	var title = document.getElementsByClassName('editTitle_swrcbw');
        var flag = document.getElementsByClassName('discussion-meta-controls');
        var programFlags = programData.scratchpad.flags;

        //if(flag.length < 1 || title.length < 1){ 
        if (flag.length < 1) {
            console.log("Flag.length < 1")
            return; 
        }
        //if (!DomIsLoaded) { return; }

        //if (DomIsLoaded && flag.length < 1) {
            //clearInterval(addFlags);
        //}
        try {
            var flagString = ' • ' + programData.scratchpad.flags.length;
            flag[0].childNodes[2].innerHTML += flagString;
            console.log(flagString)
            
            // Hover over flag button to show flag reasons.
            if (flag[0].childNodes[2].className === "link_1uvuyao-o_O-computing_77ub1h-o_O-disabled_2gos5") {
                flag[0].childNodes[2].className = "link_1uvuyao-o_O-computing_77ub1h";
            }
        }
        catch(flag) {
            // ADD : If page is loaded but still no flags, clearinterval.
            console.log('Flag is not defined.');
            //if (DomIsLoaded) {
                //clearInterval(addFlags);
            //}
            return;
        }
        
        var flagBtn = document.getElementsByClassName("link_1uvuyao-o_O-computing_77ub1h")[0];

        flagBtn.onmouseover = function() {
            var reasons = '';
            programFlags.forEach(function(element) {
                reasons += element + "\n";
            });
            flagBtn.title = reasons;
            if (flag.length === 0) {
                reasons = "None";
            }
            
        };
        //}
        //}
        clearInterval(addFlags);
    }
};

/*** When viewing the hotlist or a projects list, flag counts will be added next to spinoffs. ***/
function showProgramsFlags() {
    var programLinks = document.getElementsByClassName("link_1uvuyao-o_O-noUnderline_4133r1"), i = 0;
    if (programLinks.length < 2) { 
        console.log("Still loading programs.");
        return;
    };

    var handleResponse = function(a) {
        ids.push(+programLinks[counter].href.split("/")[5]);
        objs.push(a);
        if (counter === programLinks.length - 1) {
            for (result = objs.sort(function(a, b) {
                    return ids.indexOf(a.id) < ids.indexOf(b.id) ? -1 : 1
                }), a = 0; a < result.length; a++) {
                programLinks[a].nextSibling.nextSibling.innerHTML += " \u00b7 <span title=\"" + result[a].flags.join('\n') + "\">" + result[a].flags.length + " Flag" + (1 === result[a].flags.length ? "" : "s")
            }
        }
    }
    for (; i < programLinks.length; i++) {
        var id = programLinks[i].href.split("/")[5], counter = 0, ids = [], objs = [], result;
        $.getJSON("https://www.khanacademy.org/api/internal/scratchpads/" + id, function(a, c) {
            handleResponse(a);
            counter++;
        });
    }
    console.log("Done");
    clearInterval(programFlags);
};

/*** When viewing a program, it shows when it was created and last updated. ***/
function showProgramDates() {
    // TESTING
    if (programData.scratchpad.created) {
        var date = document.getElementsByClassName("link_1uvuyao-o_O-computing_1nblrap author-nickname profile-programs")[0];
        var createdDate = newDate(programData.scratchpad.created);
        var updatedDate = newDate(programData.scratchpad.date);
        //if (programData.scratchpad.kaid === _KA._userProfileData.kaid) {
            var myFlags = programData.scratchpad.flags.length;
        //}

        date.nextElementSibling.innerHTML = "<br>Created: " + createdDate + "<br>Last updated: " + updatedDate + (programData.scratchpad.kaid === KA._userProfileData.kaid ? ('<br>Flags: ' + myFlags) : '');
    }

	clearInterval(getDates);
};

/*** Display more info about a user when viewing their profile. ***/
function getProfileData() {
    var profile = document.getElementsByClassName('user-statistics-table');

    if( profile.length < 1){ return; }
    var table = document.getElementsByClassName('user-statistics-table')[0];
    var tableBody = table.childNodes[0];
    var kaid = userInfo.kaid;
    var dateJoined = newDate(userInfo.dateJoined);
    
    var numVotes = 0;
    var numSpinoffs = 0; 
    var numTips = 0;
    var numPrograms = userPrograms.scratchpads.length;
    for(var i = 0; i < userPrograms.scratchpads.length; i++){
        var scratchpad = userPrograms.scratchpads[i];
        numVotes += scratchpad.sumVotesIncremented;
        numSpinoffs += scratchpad.spinoffCount;
    }
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Account created</td><td>' + dateJoined + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Programs</td><td>' + numPrograms + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Votes received</td><td>' + numVotes + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Spinoffs received</td><td>' + numSpinoffs + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Average votes received</td><td>' + Math.round((numVotes/numPrograms) * 100) / 100 + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">Average spinoffs received</td><td>' + Math.round((numSpinoffs/numPrograms) * 100) / 100  + '</td></tr>';
    tableBody.innerHTML += '<tr><td class="user-statistics-label">User kaid</td><td>' + kaid + '</td></tr>';
    clearInterval(profileData);
};


if (window.location.host === 'www.khanacademy.org') {
    var notifications = setInterval(updateNotifs, 250);
    if (url[3] === 'computer-programming' && url[4] !== 'new') {
        //console.log(document.getElementsByClassName('nicknameDisplay_u7ifp')[0].textContent);
        //if (programData.creatorProfile.nickname !== document.getElementsByClassName('nicknameDisplay_u7ifp')[0].textContent) {
        //    console.log(programData.creatorProfile.nickname + ' = ' + document.getElementsByClassName('nicknameDisplay_u7ifp')[0].textContent + '?');
            var addFlags = setInterval(addFlagsToProgram,250);
        	var getDates = setInterval(showProgramDates, 250);
            var widenprogram = setInterval(widenProgram, 250);
            if (url[4] === 'browse') {
                var programFlags = setInterval(showProgramsFlags, 500);
            }

        //}
        var EditComments; //= setInterval(editComments, 250);
    } else if (url[3] === 'profile') {
        var profileData = setInterval(getProfileData, 250);
    } else if (url[5] === 'projects' || url[5] === 'browse') {
        var programFlags = setInterval(showProgramsFlags, 250);
    }
}

/*
if (window.location.host === 'khanacademy.zendesk.com' && window.location.href.split('/')[5] === 'articles') {
	var UpdateArticle = setInterval(updateArticle, 500);
}*/


/********************************************************************************/








