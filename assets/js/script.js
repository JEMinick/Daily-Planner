
var bDebugging = false;

var mainForm = document.querySelector(".container");

var iStartHour = 7; // based on 24-hour clock with a value of 0..23
var iTotalWorkdayHours = 11; // 1..24

// var aDailyHours = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
// var aDailyHours = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
var aDailyHours = [];
for( var i=1; i <= iTotalWorkdayHours; i++ ) {
    aDailyHours.push( i );
}

function ConvertTo24( sTime2Convert )
{
    var sTime = sTime2Convert.trim().toLowerCase();
    // if ( bDebugging )
    // {
    //     console.log( "sTime2Convert: \"" + sTime + "\"" );
    //     // console.log( "Index of ':' is [" + sTime.search(":") + "]" );
    // }
    var sHour = sTime.substr(0,sTime.search(":"));
    // if ( bDebugging )
    //     console.log( "sHour extracted from sTime: \"" + sHour + "\"" );
    
    var iHour = parseInt(sHour);

    if ( sTime.search("pm") > 0 )
    {
        if ( iHour < 12 )
            iHour = iHour+12;
            // if ( bDebugging )
            //     console.log( "isPM (12pm..11pm): \"" + sHour + "\" [24-Hour-Clock:"+iHour+"]" );
    } else {
        if ( iHour === 12 )
            iHour = 0;
        // if ( bDebugging )
        //     console.log( "isAM (12am..11am): \"" + sHour + "\" [24-Hour-Clock:"+iHour+"]" );
    }
    return( iHour );
}

var sDailyList = "<section>";  // just created for logging purposes...
var elMainFormContainerDiv = document.createElement( "section" );
var elMainFormHours = mainForm.appendChild( elMainFormContainerDiv );

aDailyHours.forEach( function(iHour)
{
    var sClsHour = "clsHour"+iHour;             // used to query the hour value
    var sClsUserEntry = "clsUserEntry"+iHour;   // used for getItem() / setItem()
    var sClsSaveBtn = "clsSaveBtn"+iHour;       // used for the click() event...

    var iRelativeHour = ( (iStartHour+iHour-1) % 24 ); // produces 0..23
    var iPlannerHour = ( (iStartHour+iHour-1) % 12 ); // produces 0..11
    var sAMorPM = sAMorPM = ( iRelativeHour < 12 ) ? "am" : "pm";

    if ( iPlannerHour === 0 )
        iPlannerHour = 12;

    // ---------------------- OBJECTIVE: ---------------------------------
    // <div class="row">
    //    <div class="col-2 time-block clsHour1">h:00 am/pm</div>
    //    <textarea class="col-9 entryBlock clsUserEntry1"></textarea>
    //    <button class="col-1 saveBtn far fa-save clsSaveBtn1"></button>
    // </div>
    // -------------------------------------------------------------------

    var sMainFormHourRow = "div";
    var elMainFormHourRow = document.createElement(sMainFormHourRow);
    elMainFormHourRow.setAttribute( "class", "row" );
    var elNewMainFormHour = elMainFormHours.appendChild( elMainFormHourRow );
    
    var sMainFormHourRowTimeDiv = "div";
    var elMainFormHourRowTimeDiv = document.createElement(sMainFormHourRowTimeDiv);
    elMainFormHourRowTimeDiv.setAttribute( "class", "col-2 time-block "+sClsHour );
    elMainFormHourRowTimeDiv.textContent = iPlannerHour+":00"+sAMorPM;
    var elNewMainFormHourTimeDiv = elNewMainFormHour.appendChild( elMainFormHourRowTimeDiv );

    var sMainFormHourRowEntryDiv = "textarea";
    var elMainFormHourRowEntryDiv = document.createElement(sMainFormHourRowEntryDiv);
    elMainFormHourRowEntryDiv.setAttribute( "class", "col-9 entryBlock "+sClsUserEntry );
    var elNewMainFormHourEntryDiv = elNewMainFormHour.appendChild( elMainFormHourRowEntryDiv );

    var sMainFormHourRowBtnDiv = "button";
    var elMainFormHourRowBtnDiv = document.createElement(sMainFormHourRowBtnDiv);
    elMainFormHourRowBtnDiv.setAttribute( "class", "col-1 saveBtn far fa-save "+sClsSaveBtn );
    var elNewMainFormHourRowBtnDiv = elNewMainFormHour.appendChild( elMainFormHourRowBtnDiv );

    sDailyList += "<div class=\"row\"> "
                + "<div class=\"col-2 time-block "+sClsHour+"\">"+iPlannerHour+":00 "+sAMorPM+"</div> "
                + "<textarea class=\"col-9 entryBlock "+sClsUserEntry+"\"></textarea> "
                + "<button class=\"col-1 saveBtn far fa-save "+sClsSaveBtn+"></button> "
              + "</div>";

} )

sDailyList += "</section>";
if ( bDebugging ) {
    console.log( "The DailyList created:" );
    console.log( sDailyList );
}

// ================================================================================================================

// -------- --------------- --------------------------------------------------------------------------------
// Input	Example	        Description
// -------- --------------- --------------------------------------------------------------------------------
// YYYY	    2014	        4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode
// YY	    14	            2 digit year
// Y	    -25	            Year with any number of digits and sign
// Q	    1..4	        Quarter of year. Sets month to first month in quarter.
// M MM	    1..12	        Month number
// MMM MMMM	Jan..December	Month name in locale set by moment.locale()
// D DD	    1..31	        Day of month
// Do	    1st..31st	    Day of month with ordinal
// DDD DDDD	1..365	        Day of year
// X	    1410715640.579	Unix timestamp
// x	    1410715640579	Unix ms timestamp

// -------- --------------- --------------------------------------------------------------------------------
// Input	Example	        Description
// -------- --------------- --------------------------------------------------------------------------------
// gggg	    2014	        Locale 4 digit week year
// gg	    14	            Locale 2 digit week year
// w ww	    1..53	        Locale week of year
// e	    0..6	        Locale day of week
// ddd dddd	Mon...Sunday    Day name in locale set by moment.locale()
// GGGG	    2014	        ISO 4 digit week year
// GG	    14	            ISO 2 digit week year
// W WW	    1..53	        ISO week of year
// E	    1..7	        ISO day of week

// -------- --------------- --------------------------------------------------------------------------------
// Input	Example	        Description
// -------- --------------- --------------------------------------------------------------------------------
// H HH	    0..23	        Hours (24 hour time)
// h hh	    1..12	        Hours (12 hour time used with a A.)
// k kk	    1..24	        Hours (24 hour time from 1 to 24)
// a A	    am pm	        Post or ante meridiem (Note the one character a p are also considered valid)
// m mm	    0..59	        Minutes
// s ss	    0..59	        Seconds
// S SS SSS ... SSSSSSSS	0..999999999	Fractional seconds
// Z ZZ	    +12:00	        Offset from UTC as +-HH:mm, +-HHmm, or Z

// -------- --------------- --------------------------------------------------------------------------------

// Display a user-friendly formatted date on the screen:
var selCurrentDate = document.querySelector("#currentDay");
selCurrentDate.textContent = moment().format('dddd[,] MMMM Do YYYY');

// Gets the current time and turns the current hour into a number (0..23).
var currentHour = moment().format('H');
currentHour = parseInt(currentHour);

// ======================================================================================================
// ======================================================================================================

/* ----------------------------------------------------------------------------------------------
    Just for fun:  Let's read the current DOM and identify the 2 following elements:
       1) The first hour on the schedule converted to a 24 hour format (0..23)
       2) The total # of hours on the active schedule.
   ---------------------------------------------------------------------------------------------- */
var iStartingHour=-1, 
    iTotalHours=0;
var bDone=false;
for( var i=0; ( i < 24 ) && !bDone; i++ )
{
    var iHour = (i+1);
    var sClsHour = ".clsHour"+iHour;
    if ( document.querySelector(sClsHour) === null ) {
        bDone=true;
    } else {
        var selHour = document.querySelector(sClsHour).textContent;
        if ( selHour === '' ) {
            bDone=true;
        } else {
            var sUserEntry = ".clsUserEntry"+iHour;
            var selUserEntry = document.querySelector(sUserEntry);
            if ( selUserEntry === null ) {
                bDone=true;
            } else {
                ++iTotalHours;
                if ( iStartingHour < 0 )
                    iStartingHour = ConvertTo24( selHour );
            }
        }
    }
}

if ( bDebugging )
{
    console.log( "Found the following HOURS: " )
}

var sStartingHour = "";
if ( iStartingHour < 0 )
    sStartingHour = "[ No Scheduled Hours! ]";
else {
    sStartingHour = ((iStartingHour < 10) ? "0" : "") + iStartingHour + "00";
}

if ( bDebugging )
{
    console.log( "   Starting @ " + sStartingHour );
    console.log( "   Total Hours: [" + iTotalHours + "]" );
}

// =============================================================================================
// Now we need to build 2 arrays for color coding:
// ------------------------------------------------
//    iaHours : The hour value (on a scale of 0..23)
//       (e.g., a 9am to 5pm day would be: [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ] )
//              an 11pm to 7am day would be: [ 23, 0, 1, 2, 3, 4, 5, 6, 7 ]
//       An array of schedule hours to determine if the row should be past, present or future.
///
//    selaUserEntry: An array of query selectors that have already been validated to exist.
//       An array used to add a class to reflect the appropriate background color.

var iaHours = [];
var selaUserEntry = [];

for ( var i=0; ( i < iTotalWorkdayHours ); i++ ) {
    var iHour = (i+1);
    // If we need to do a querySelector() for the schedule's hour:
    //    var sClsHour = ".clsHour"+iHour;
    //    var selHour = document.querySelector(sClsHour).textContent;
    iaHours.push( (iStartHour+i) - ( ((iStartHour+i) > 23) ? 24 : 0) );
    // We need the '.clsUserEntry#' selector to apply the appropriate background color to,
    // therefore obtain the handle so we can modify its class:
    var sUserEntry = ".clsUserEntry"+iHour;
    var selUserEntry = document.querySelector(sUserEntry);
    selaUserEntry.push( selUserEntry );
}

if ( bDebugging )
{
    console.log( "The arrays built relate to the following schedule:" );
    var sSchedule = "[ ";
    for( var i=0; (i < iTotalWorkdayHours); i++ ) {
        sSchedule += iaHours[i] + (i < (iTotalWorkdayHours-1) ? ", " : "");
    }
    console.log( sSchedule + " ]" );
}

// --------------------------------------------------------------------------
// Update the screen with a 'past', 'present' or 'future' background color:
// --------------------------------------------------------------------------

var bFoundPresentHour=false;

function colorTheSchedule() {
  for( var i=0; ( i < iaHours.length ); i++ )
  {
    // if ( bDebugging )
    //   console.log( "seeking the present hour of: [" + currentHour + "]" 
    //                + " ( [i="+i+"] of ["+iaHours.length+"] )" 
    //                + " ( iaHours[i] === " + iaHours[i] + " )" 
    //              );
    if ( bFoundPresentHour ) {
        // a FUTURE hour:
        selaUserEntry[i].classList.add( "future" );
    }
    else if ( iaHours[i] === currentHour ) {
        // the PRESENT time:
        bFoundPresentHour = true;
        selaUserEntry[i].classList.add( "present" );
    }
    else {
        // a PAST hour:
        selaUserEntry[i].classList.add( "past" );
    }
  }
}

colorTheSchedule();

// ================================================================================================================

// For any button click event:
//    1) Retrieve the text from the associated clsUserEntry1..n
//    2) Save the retrieved text to a unique value associated to the nTH hour

var recHourInfo = {
    Hour: 0,
    UserEntry: ""
}

function CreateStorageID( iHour )
{
    var sStorageID = "";
    if ( (iHour >= 0) && (iHour < 24) ) {
        sStorageID = ((iHour < 10) ? "0" : "") + iHour + "00";
    }
    return( sStorageID );
}

// saveHourInfo( iHourRow: [1..24], sUserEntry: [string data] )
function saveHourInfo( iHourRow, sUserEntry )
{
    var sClsHour = ".clsHour"+iHourRow;
    var s12HourTime = document.querySelector(sClsHour).textContent;
    var iTimeHour = ConvertTo24( s12HourTime ); // [ 0 .. 23 ]
    var sTimeHour = CreateStorageID( iTimeHour );
    recHourInfo.Hour = iTimeHour;
    recHourInfo.UserEntry = sUserEntry;
    var sHourInfo = JSON.stringify(recHourInfo);
    if ( bDebugging )
        console.log( "setItem(\""+sTimeHour+"\",\""+sHourInfo+"\")" );
    localStorage.setItem( sTimeHour, sHourInfo );
    recHourInfo = JSON.parse( localStorage.getItem( sTimeHour ) );
    if ( bDebugging )
        console.log( "getItem(\"" + sTimeHour + "\"): [" + recHourInfo.Hour + "],[" + recHourInfo.UserEntry + "]" );
}

if ( bDebugging )
   console.log( "Begining the retrieval of [" + iTotalWorkdayHours + "] hours of data..." );

// ----------------------------------------------------------------------
for( var i=0 ; ( i < iTotalWorkdayHours ); i++ )
{
    // Converted the following 3 from var to let;
    let iHour=(i+1);
    let sSaveBtn = ".clsSaveBtn"+iHour;
    let sUserEntry = ".clsUserEntry"+iHour;
    
    if ( bDebugging ) {
        console.log( "------------------------------------------------" );
        console.log( "Creating Event Handler: $("+sSaveBtn+").click()" );
    }
    //===========================================================================
    //  Click event handler:
    // ======================
    $(sSaveBtn).click( function() {
        if ( bDebugging ) {
            console.log( "------------------------------------------------" );
            console.log( "EVENT: $("+sSaveBtn+").click()" );
        }
        var sUserEntryVal = $(sUserEntry).val();
        saveHourInfo( iHour, sUserEntryVal );
    });
    //===========================================================================
    var sStorageID = CreateStorageID( ((iStartHour+i) % 24) );
    if ( bDebugging ) {
        console.log( "localStorage.getItem(\""+sStorageID+"\")" );
    }
    var sHourData = localStorage.getItem( sStorageID ) 
    if ( sHourData ) {
        if ( bDebugging )
            console.log( "HOUR-" + (i+1) + " (" + sStorageID + "): [" + sHourData + "]" );
        recHourInfo = JSON.parse( sHourData );
        if ( bDebugging )
            console.log( "$("+sUserEntry+").val(\""+recHourInfo.UserEntry+"\");" );
        $(sUserEntry).val( recHourInfo.UserEntry );
    }
}
