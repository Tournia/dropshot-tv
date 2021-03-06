/* ===========================================================
 * Copyright 2012 SB Helios, Netherlands.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

$(document).ready(function() {
	//auto start
	startRefresh();
	
	// Reload columns
	$(".isbt-logo").click(function() {
		startRefresh();
	});
	
	$(".current-matches").click(function() {
		reloadCurrentMatches();
	});

	$(".upcoming-matches").click(function() {
		reloadUpcomingMatches();
/* 		servePage("upcoming-matches"); */
	});

	$(".match-scores").click(function() {
		reloadMatchScores();
	});

/*
	$("div").click(function () {
		$(".slide-down").slideDown("slow");
		$(".slide-down").addClass("highlight");
		setTimeout(function() {
			$(".slide-down").removeClass("highlight");
		}, 3000)
	});
*/
});

//Call for page
function servePageWithData(anchor, data)
{
	if(typeof data == "undefined")
	{
		data = [];
	}
	data.push({"name" : "page", "value" : "caroussel_" + anchor});

	$.post('pages/servePage.php', data, function(data) {
		if(data.error == true){
			$('header .messages').html("<div class=\"alert alert-error\" style=\"display: none;\"><strong>Oh snap! </strong> Something went wrong with fetching new results.</div>");
			$("header .messages .alert").fadeIn();
		}else{
			if(data.allColumns == true)
			{
				$("." + data.currentMatches.column + " .match-data").html(data.currentMatches.html).fadeIn();
				$("." + data.upcomingMatches.column + " .match-data").html(data.upcomingMatches.html).fadeIn();
				$("." + data.matchScores.column + " .match-data").html(data.matchScores.html).fadeIn();
			} else {			
				$("." + data.column + " .match-data").html(data.html).fadeIn();
				
	
	/*
				$("." + data.column + " .match-data").prepend(data.html);
					
				$(".slide-down").slideDown("slow");
				$("." + data.column + " .match-data > div:gt(" + ( maxAllowed-1 ) + ")" ).slideUp("slow", function() {
					$(this).remove();
				});
	
				$(".slide-down").addClass("highlight").removeClass("slide-down");
				setTimeout(function() {
					$(".highlight").removeClass("highlight");
				}, 30000)
	*/
				
				// Remove error message if there was one
			}
			
			$("header .messages .alert").fadeOut(function() {
				$(this).remove();
			});
		}
	}, "json");
}

function servePage(anchor){
	servePageWithData(anchor, []);
}

var maxAllowed = 10;

function startRefresh(set) {
	refreshTime = 10000;
	setTimeout(startRefresh, refreshTime);
	
	reloadAll();
}

function reloadCurrentMatches() {
	latestStartTime = '';
	if($(".current-matches .match-data div")[0]) {
		latestStartTime = $(".current-matches .match-data div:first-child").attr("id").substr(10);
	}

	data = [];
	data.push({"name" : "latestStartTime", "value" : latestStartTime});
	data.push({"name" : "maxAllowed", "value" : maxAllowed});

	servePageWithData("current-matches", data);
}

function reloadUpcomingMatches() {
	lastUpcomingMatchId = '';
	if($(".upcoming-matches .match-data div")[0]) {
		lastUpcomingMatchId = $(".upcoming-matches .match-data div:first-child").attr("id").substr(8);
	}

	data = [];
	data.push({"name" : "lastUpcomingMatchId", "value" : lastUpcomingMatchId});
	data.push({"name" : "maxAllowed", "value" : maxAllowed});

	servePageWithData("upcoming-matches", data);
}

function reloadMatchScores() {
	latestEndTime = '';
	if($(".match-scores .match-data div")[0]) {
		latestEndTime = $(".match-scores .match-data div:first-child").attr("id").substr(8);
	}

	data = [];
	data.push({"name" : "latestEndTime", "value" : latestEndTime});
	data.push({"name" : "maxAllowed", "value" : maxAllowed});

	servePageWithData("match-scores", data);
}

function reloadAll() {
	data = [];
	data.push({"name" : "maxAllowed", "value" : maxAllowed});

	servePageWithData("all", data);
}