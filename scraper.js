console.log("Content script yay");

var betygsMapKTH = new Map([
    ['A', 5.0],
    ['B', 4.5],
    ['C', 4.0],
    ['D', 3.5],
    ['E', 3.0],
]);

// $(document).ready(function(){
//     $('body').on('click', 'a', function(){
//         chrome.tabs.create({url: $(this).attr('href')});
//         return false;
//     });
// });

// TODO: Om rätt ladoksida är uppe, dölj texten som säger åt dig att logga in i ladok t.ex. chrome.tabs.create on('click'


$(document).ready(function () {
    var cards = $("ladok-avslutad-kurs");//.find(".card-body");
    //console.log(cards.text());
    var number_of_cards = cards.length;
    console.log("Found " + number_of_cards + " course cards");

    var arr = [];
    var points = [];
    var undef = [];
    var course_list = [];
    cards.each(function ( index ) {
        var betyg = $( this ).find("strong:contains('Grade:')").text().split(" ")[1];
        var kurs  = $( this ).find("ladok-kurslink[kursvy='resultat'] .ldk-visa-desktop").text();
        console.log(betyg + "\t" + kurs);

        arr.push(betyg + "<br>" + kurs + "<br>");
        course_list.push(kurs + "<br>" + betyg + "<br>");

        var thisgrade = betygsMapKTH.get(betyg);
        if (thisgrade !== undefined) {
            points.push(thisgrade);
        } else {
            undef.push("<b>" + betyg + "</b>" + " i kursen " + kurs);
        }
    });

    if (points.length > 0) {
        var total = points.reduce(function (sum, num) { return sum + num; });
        //var firstGrade = betygsMapKTH.values().next().value;

        var gpa = total / points.length;
        console.log("Sending message '" + gpa.toFixed(3).toString() + "' ...");
        chrome.runtime.sendMessage(gpa.toFixed(3).toString());
        
        //chrome.runtime.sendMessage("<h2>Ditt betygssnitt: " + gpa + " av " + firstGrade + "</h2>");
    }
    return; // test
    

    if (undef.length) {
        chrome.runtime.sendMessage("<p class='grey'>" + undef.length + " betyg kunde ej värderas och togs ej med i beräkningen:</p>");
        undef.forEach(value => {
            chrome.runtime.sendMessage(value + "<br>");
        })
    }

    chrome.runtime.sendMessage("<h3>Kurslista</h3>")
    course_list.forEach(v => { chrome.runtime.sendMessage(v); });

    /*
    var grades = [];

    betyg.each(function ( index ) {
        chrome.runtime.sendMessage(index + " " + $( this ).text() + "....." + arr.pop(index) + "<br>");
        //chrome.runtime.sendMessage($( this ).text().substr(7) + "<br>")
        grades.push($( this ).text().substr(7));
    });
    */
    //console.log(betyg.length)
    //cards.html(cards.html().replace(/\n/g,'<br/>'));
    //chrome.runtime.sendMessage( cards.text() );
});

//for (var i = 0, len = c.length; i < len; i++) {
    //console.log(c[i].innerText);
    //chrome.runtime.sendMessage(c[i].innerText);
//}

//.match(/ [A-F]/g)

