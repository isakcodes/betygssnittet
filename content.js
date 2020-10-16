chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const result = parseGPA();
    sendResponse(`${result}`);

    function parseGPA () {
        let betygsMapKTH = new Map([
            ['A', 5.0],
            ['B', 4.5],
            ['C', 4.0],
            ['D', 3.5],
            ['E', 3.0],
        ]);
        var cards = $("ladok-avslutad-kurs");//.find(".card-body");
        //console.log(cards.text());
        var number_of_cards = cards.length;
        console.log("Found " + number_of_cards + " course cards");

        var arr = [];
        var points = [];
        var undef = [];
        var course_list = [];
        cards.each(function ( index ) {
            // TODO: Internationalization *Betyg*
            var betyg = $( this ).find("strong:contains('Betyg:')").text().split(" ")[1];
            var kurs  = $( this ).find("ladok-kurslink[kursvy='resultat'] .ldk-visa-desktop").text();
            //console.log(betyg + "\t" + kurs);

            arr.push(betyg + "<br>" + kurs + "<br>");
            course_list.push(kurs + "<br>" + betyg + "<br>");

            var thisgrade = betygsMapKTH.get(betyg)
            if (thisgrade !== undefined) {
                points.push(thisgrade);
            } else {
                undef.push("<b>" + betyg + "</b>" + " i kursen " + kurs);
            }
        });

        if (points.length > 0) {
            var total = points.reduce(function (sum, num) { return sum + num; });

            var gpa = total / points.length;
            //console.log("Sending message '" + gpa.toFixed(3).toString() + "' ...");
            //chrome.runtime.sendMessage(gpa.toFixed(3).toString());
            return gpa;
            //chrome.runtime.sendMessage("<h2>Ditt betygssnitt: " + gpa + " av " + firstGrade + "</h2>");
        }

        return points.length; // test
        

        if (undef.length) {
            chrome.runtime.sendMessage("<p class='grey'>" + undef.length + " betyg kunde ej värderas och togs ej med i beräkningen:</p>");
            undef.forEach(value => {
                chrome.runtime.sendMessage(value + "<br>");
            })
        }

        chrome.runtime.sendMessage("<h3>Kurslista</h3>")
        course_list.forEach(v => { chrome.runtime.sendMessage(v); });
    }
});