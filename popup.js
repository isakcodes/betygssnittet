document.addEventListener('DOMContentLoaded', function () {
    //refresh();
    
    document.getElementById('refresh-button').addEventListener('click', refresh, false);
    
    function refresh() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'hi', setGrade);
            });
    }
    
    function setGrade(response) {
        console.log(response);
        if (response !== undefined) {
            document.getElementById("gpa").innerHTML = `${response}`;
        }
    }

    const login_url = "https://www.student.ladok.se/student/loggain";
    const grades_url = "https://www.student.ladok.se/student/#/avslutade";

    document.getElementById("login").addEventListener(
        'click', function() { chrome.tabs.create({active: true, url: login_url}); }, false);

    // TODO: Om rätt ladoksida är uppe, dölj texten som säger åt dig att logga in i ladok

    document.getElementById("grades").addEventListener(
        'click', function() { chrome.tabs.create({active: true, url: grades_url}); }, false);

}, false);
