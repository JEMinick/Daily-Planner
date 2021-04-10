
var bDebugging = true;

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

var sDailyList = "<section>";
var elMainFormContainerDiv = document.createElement( "section" );
var elMainFormHours = mainForm.appendChild( elMainFormContainerDiv );

aDailyHours.forEach( function(iHour)
{ 
    var sClsHour = "clsHour"+iHour;
    var sClsUserEntry = "clsUserEntry"+iHour;
    var sClsSaveBtn = "clsSaveBtn"+iHour;
    var iRelativeHour = ( (iStartHour+iHour-1) % 24 ); // produces 0..23
    var iPlannerHour = ( (iStartHour+iHour-1) % 12 ); // produces 0..11
    var sAMorPM = sAMorPM = ( iRelativeHour < 12 ) ? "am" : "pm";

    if ( iPlannerHour === 0 )
        iPlannerHour = 12;

    // OBJECTIVE:
    // <div class="row">
    //    <div class="col-2 time-block clsHour1">h:00 am/pm</div>
    //    <textarea class="col-9 entryBlock clsUserEntry1"></textarea>
    //    <button class="col-1 saveBtn far fa-save clsSaveBtn1"></button>
    // </div>

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

// =============================================================================================

var iHour1=-1,  iHour2=-1,  iHour3=-1,  iHour4=-1,  iHour5=-1,  iHour6=-1,
    iHour7=-1,  iHour8=-1,  iHour9=-1,  iHour10=-1, iHour11=-1, iHour12=-1,
    iHour13=-1, iHour14=-1, iHour15=-1, iHour16=-1, iHour17=-1, iHour18=-1,
    iHour19=-1, iHour20=-1, iHour21=-1, iHour22=-1, iHour23=-1, iHour24=-1;

var selUserEntry1=null,  selUserEntry2=null,  selUserEntry3=null,  selUserEntry4=null,
    selUserEntry5=null,  selUserEntry6=null,  selUserEntry7=null,  selUserEntry8=null,
    selUserEntry9=null,  selUserEntry10=null, selUserEntry11=null, selUserEntry12=null,
    selUserEntry13=null, selUserEntry14=null, selUserEntry15=null, selUserEntry16=null,
    selUserEntry17=null, selUserEntry18=null, selUserEntry19=null, selUserEntry20=null,
    selUserEntry21=null, selUserEntry22=null, selUserEntry23=null, selUserEntry24=null;
    
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
//       (e.g., a 9am to 5pm day would be: [ 9, 10, 11, 12, 13, 14, 15 ] )
//              an 11pm to 8am day would be: [ 23, 0, 1, 2, 3, 4, 5, 6, 7 ]
//       An array of schedule hours to determine if the row should be past, present or future.
///
//    selaUserEntry: An array of query selectors that have already been validated to exist.
//       We use this array to modify add a class to reflect the appropriate background color.

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

var iHour = 0;
var sStorageID = "";
var sHourData = "";

if ( bDebugging )
   console.log( "Begining the retrieval of [" + iTotalWorkdayHours + "] hours of data..." );

   // ----------------------------------------------------------------------
//    Hour-1:
$(".clsSaveBtn1").on("click", function() {
    var sUserEntry = $(".clsUserEntry1").val();
    saveHourInfo( 1, sUserEntry );
});
iHour = ( (iStartHour+0) % 24 );
sStorageID = CreateStorageID( iHour );
if ( bDebugging )
   console.log( "localStorage.getItem(\""+sStorageID+"\")" );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    if ( bDebugging )
        console.log( "HOUR-1 (" + sStorageID + "): " + sHourData );
    recHourInfo = JSON.parse( sHourData );
    if ( bDebugging )
        console.log( "getItem(\"" + sStorageID + "\"): [" + recHourInfo.Hour + "],[" + recHourInfo.UserEntry + "]" );
    $(".clsUserEntry1").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-2:
$(".clsSaveBtn2").on("click", function() {
    var sUserEntry = $(".clsUserEntry2").val();
    saveHourInfo( 2, sUserEntry );
});
iHour = ( (iStartHour+1) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry2").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-3:
$(".clsSaveBtn3").on("click", function() {
    var sUserEntry = $(".clsUserEntry3").val();
    saveHourInfo( 3, sUserEntry );
});
iHour = ( (iStartHour+2) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry3").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-4:
$(".clsSaveBtn4").on("click", function() {
    var sUserEntry = $(".clsUserEntry4").val();
    saveHourInfo( 4, sUserEntry );
});
iHour = ( (iStartHour+3) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry4").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-5:
$(".clsSaveBtn5").on("click", function() {
    var sUserEntry = $(".clsUserEntry5").val();
    saveHourInfo( 5, sUserEntry );
});
iHour = ( (iStartHour+4) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry5").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-6:
$(".clsSaveBtn6").on("click", function() {
    var sUserEntry = $(".clsUserEntry6").val();
    saveHourInfo( 6, sUserEntry );
});
iHour = ( (iStartHour+5) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID );
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry6").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-7:
$(".clsSaveBtn7").on("click", function() {
    var sUserEntry = $(".clsUserEntry7").val();
    saveHourInfo( 7, sUserEntry );
});
iHour = ( (iStartHour+6) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID );
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry7").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-8:
$(".clsSaveBtn8").on("click", function() {
    var sUserEntry = $(".clsUserEntry8").val();
    saveHourInfo( 8, sUserEntry );
});
iHour = ( (iStartHour+7) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry8").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-9:
$(".clsSaveBtn9").on("click", function() {
    var sUserEntry = $(".clsUserEntry9").val();
    saveHourInfo( 9, sUserEntry );
});
iHour = ( (iStartHour+8) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry9").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-10:
$(".clsSaveBtn10").on("click", function() {
    var sUserEntry = $(".clsUserEntry10").val();
    saveHourInfo( 10, sUserEntry );
});
iHour = ( (iStartHour+9) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry10").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-11:
$(".clsSaveBtn11").on("click", function() {
    var sUserEntry = $(".clsUserEntry11").val();
    saveHourInfo( 11, sUserEntry );
});
iHour = ( (iStartHour+10) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry11").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-12:
$(".clsSaveBtn12").on("click", function() {
    var sUserEntry = $(".clsUserEntry12").val();
    saveHourInfo( 12, sUserEntry );
});
iHour = ( (iStartHour+11) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry12").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-13:
$(".clsSaveBtn13").on("click", function() {
    var sUserEntry = $(".clsUserEntry13").val();
    saveHourInfo( 13, sUserEntry );
});
iHour = ( (iStartHour+12) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry13").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-14:
$(".clsSaveBtn14").on("click", function() {
    var sUserEntry = $(".clsUserEntry14").val();
    saveHourInfo( 14, sUserEntry );
});
iHour = ( (iStartHour+13) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry14").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-15:
$(".clsSaveBtn15").on("click", function() {
    var sUserEntry = $(".clsUserEntry15").val();
    saveHourInfo( 15, sUserEntry );
});
iHour = ( (iStartHour+14) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry15").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-16:
$(".clsSaveBtn16").on("click", function() {
    var sUserEntry = $(".clsUserEntry16").val();
    saveHourInfo( 16, sUserEntry );
});
iHour = ( (iStartHour+15) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry16").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-17:
$(".clsSaveBtn17").on("click", function() {
    var sUserEntry = $(".clsUserEntry17").val();
    saveHourInfo( 17, sUserEntry );
});
iHour = ( (iStartHour+16) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry17").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-18:
$(".clsSaveBtn18").on("click", function() {
    var sUserEntry = $(".clsUserEntry18").val();
    saveHourInfo( 18, sUserEntry );
});
iHour = ( (iStartHour+17) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry18").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-19:
$(".clsSaveBtn19").on("click", function() {
    var sUserEntry = $(".clsUserEntry19").val();
    saveHourInfo( 19, sUserEntry );
});
iHour = ( (iStartHour+18) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry19").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-20:
$(".clsSaveBtn20").on("click", function() {
    var sUserEntry = $(".clsUserEntry20").val();
    saveHourInfo( 20, sUserEntry );
});
iHour = ( (iStartHour+19) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry20").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-21:
$(".clsSaveBtn21").on("click", function() {
    var sUserEntry = $(".clsUserEntry21").val();
    saveHourInfo( 21, sUserEntry );
});
iHour = ( (iStartHour+20) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry21").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-22:
$(".clsSaveBtn22").on("click", function() {
    var sUserEntry = $(".clsUserEntry22").val();
    saveHourInfo( 22, sUserEntry );
});
iHour = ( (iStartHour+21) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry22").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-23
$(".clsSaveBtn23").on("click", function() {
    var sUserEntry = $(".clsUserEntry23").val();
    saveHourInfo( 23, sUserEntry );
});
iHour = ( (iStartHour+22) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry23").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
//    Hour-24:
$(".clsSaveBtn24").on("click", function() {
    var sUserEntry = $(".clsUserEntry24").val();
    saveHourInfo( 24, sUserEntry );
});
iHour = ( (iStartHour+23) % 24 );
sStorageID = CreateStorageID( iHour );
sHourData = localStorage.getItem( sStorageID ) 
if ( sHourData ) {
    recHourInfo = JSON.parse( sHourData );
    $(".clsUserEntry24").val(recHourInfo.UserEntry);
}
// ----------------------------------------------------------------------
