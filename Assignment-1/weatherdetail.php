<!DOCTYPE html>
<html>
<head>
<style>
.v1 {
  border-left: 3px solid #ffffff;
}
#tableView, #tableView tr, #tableView td {
  border: 2px solid #1370bd;
  border-collapse: collapse;
  color: #ffffff; 
  font-size: 15px;
  text-align: center;
  padding: 3px;
  
}
#dailyWeatherView tr td {
  color: #ffffff; 
  font-size: 15px;
  font-weight: bold; 
  padding: 0px;
  
}
#state.options{
 height:150px;   
}
</style>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script>
function validateInput(){
	flag=false;
	if(!document.getElementById("street").value) flag=true;
	if(!document.getElementById("city").value) flag=true;
	if(document.getElementById("state").value=='XX' || document.getElementById("state").value=='YY') flag=true;
	
	if(flag && !document.getElementById("currentLocation").checked){
		document.getElementById("errorText").innerHTML = 'Please check the input address.';
		document.getElementById("cardView").style.display='none';
		document.getElementById("tableView").style.display='none';
		return false;
	} else return true;
}
function clearInputs(clearCheckBox){
	document.getElementById("street").value='';
	document.getElementById("city").value='';
	document.getElementById("state").value='XX';
	
	if(clearCheckBox) {
		document.getElementById("currentLocation").checked=false;
		document.getElementById("street").disabled=false;
		document.getElementById("city").disabled=false;
		document.getElementById("state").disabled=false;
	}
}
function checkBoxClick(){
	if(document.getElementById("currentLocation").checked){
		clearInputs(false);
		document.getElementById("street").disabled=true;
		document.getElementById("city").disabled=true;
		document.getElementById("state").disabled=true;
		
		var xmlhttp=new XMLHttpRequest();         
		xmlhttp.open("GET","http://ip-api.com/json",false);
		xmlhttp.send(); 
		jsonDoc=xmlhttp.responseText; 
		if(xmlhttp.status == 404) alert('Could not retrieve JSON from ip-api.com');
		else{
			var data = JSON.parse(jsonDoc);
			document.getElementById("hiddenLatitude").value=data.lat;
			document.getElementById("hiddenLongitude").value=data.lon;
			document.getElementById("hiddenCity").value=data.city;
		}
	}
	else clearInputs(true);
}
function myFunction(time){
	document.getElementById('cardView').style.display='none';
	document.getElementById('tableView').style.display='none';
	document.getElementById('hidTime').value=time;
	document.getElementById('hidSubmit1').click();
}
function displayGraph(){
	document.getElementById('display').style.display='none';
	document.getElementById('hide').style.display='inline-block';
	document.getElementById('chart_div').style.visibility='visible';
}
function hideGraph(){
	document.getElementById('display').style.display='inline-block';
	document.getElementById('hide').style.display='none';
	document.getElementById('chart_div').style.visibility='hidden';
}
function pageLoad(){
if(!document.getElementById('currentLocation').checked){
	if(document.getElementById('hiddenState').value) 
		document.getElementById('state').value = document.getElementById('hiddenState').value;
	else
		document.getElementById('state').value = "XX";
}
else 
	checkBoxClick();
}
function inputHiddenForm(){
	document.getElementById('hidLatitude1').value=document.getElementById('hidLatitude').value;
	document.getElementById('hidLongitute1').value=document.getElementById('hidLongitute').value;
	document.getElementById('hidTime1').value=document.getElementById('hidTime').value;
}
</script>
</head>
<body onload="pageLoad();">
<form method="POST" >
<table id="weatherSearchBox" width="700px" style="margin: auto; background-color: #068f1d; border-radius:15px">
	<tr>
		<td colspan="3" align="center" style="color: #ffffff; font-size: 50px; "><i>Weather Search</i></td>
	</tr>
	<tr>
		<td style="color: #ffffff; padding-left: 40px; font-size:15px; width: 350px; font-weight: bold;">
			Street&nbsp;&nbsp;<input type="text" id="street" name="street" value="<?php if(isset($_POST['street'])) echo $_POST['street']; ?>"><br><br>
			City&nbsp;&nbsp;&nbsp;&nbsp;<input  type="text" id="city" name="city" value="<?php if(isset($_POST['city'])) echo $_POST['city']; ?>"><br><br>
			State&nbsp;&nbsp;<select id="state" name="state">
					<option value="XX">State</option>
					<option value="YY">-------------------------------------</option>
					<option value="AL">Alabama</option>
  					<option value="AK">Alaska</option>
  					<option value="AZ">Arizona</option>
  					<option value="AR">Arkansas</option>
  					<option value="CA">California</option>
  					<option value="CO">Colorado</option>
  					<option value="CT">Connecticut</option>
  					<option value="DE">Delaware</option>
  					<option value="DC">District Of Columbia</option>
  					<option value="FL">Florida</option>
  					<option value="GA">Georgia</option>
  					<option value="HI">Hawaii</option>
  					<option value="ID">Idaho</option>
  					<option value="IL">Illinois</option>
  					<option value="IN">Indiana</option>
  					<option value="IA">Iowa</option>
  					<option value="KS">Kansas</option>
  					<option value="KY">Kentucky</option>
  					<option value="LA">Louisiana</option>
  					<option value="ME">Maine</option>
  					<option value="MD">Maryland</option>
  					<option value="MA">Massachusetts</option>
  					<option value="MI">Michigan</option>
  					<option value="MN">Minnesota</option>
  					<option value="MS">Mississippi</option>
  					<option value="MO">Missouri</option>
  					<option value="MT">Montana</option>
  					<option value="NE">Nebraska</option>
  					<option value="NV">Nevada</option>
  					<option value="NH">New Hampshire</option>
  					<option value="NJ">New Jersey</option>
  					<option value="NM">New Mexico</option>
  					<option value="NY">New York</option>
  					<option value="NC">North Carolina</option>
  					<option value="ND">North Dakota</option>
  					<option value="OH">Ohio</option>
  					<option value="OK">Oklahoma</option>
  					<option value="OR">Oregon</option>
  					<option value="PA">Pennsylvania</option>
  					<option value="RI">Rhode Island</option>
  					<option value="SC">South Carolina</option>
  					<option value="SD">South Dakota</option>
  					<option value="TN">Tennessee</option>
  					<option value="TX">Texas</option>
  					<option value="UT">Utah</option>
  					<option value="VT">Vermont</option>
  					<option value="VA">Virginia</option>
  					<option value="WA">Washington</option>
  					<option value="WV">West Virginia</option>
  					<option value="WI">Wisconsin</option>
  					<option value="WY">Wyoming</option>
				</select>
				<input type="text" style="visibility: hidden;" id="hiddenState" name="hiddenState" value="<?php if(isset($_POST['state'])) echo $_POST['state']; ?>">
				<input type="text" style="visibility: hidden;" id="hiddenLatitude" name="hiddenLatitude">
				<input type="text" style="visibility: hidden;" id="hiddenLongitude" name="hiddenLongitude">
				<input type="text" style="visibility: hidden;" id="hiddenCity" name="hiddenCity">
		</td>
		<td class="v1">
		</td>
		<td style="color: #ffffff; padding-right: 40px; text-align: right; font-weight: bold;">
			<input type="checkbox" id="currentLocation" name="currentLocation" onclick="checkBoxClick()" value="XX" <?php if(isset($_POST['currentLocation'])) echo "checked='checked'"; ?>>Current Location<br><br><br><br><br>
		</td>
	</tr>
	<tr>
		<td style="color: #ffffff; padding-right: 40px; text-align: right;">
			<input type="submit" value="search" name="search" onClick="return validateInput();">
			<input type="submit" value="clear" name="clear" onClick="clearInputs(true);"><br><br>
		</td>
	</tr>
</table>
<form method="POST" id="hiddenForm1" style="display:none;">
		<input style="display:none;" type="text" id="hidLatitude1" name="hidLatitude1">
		<input style="display:none;" type="text" id="hidLongitute1" name="hidLongitute1">
		<input style="display:none;" type="text" id="hidTime1" name="hidTime1">
		<input style="display:none;" type="submit" id="hidSubmit1" name="hidSubmit1" onclick="inputHiddenForm();">
</form>
</form>

<br>
<!--<table id="errorText" bgcolor="#dedee0" style="font-size:15px; border: 2px solid #7c7c7d; margin-left: 220px; padding-left: 50px; padding-right: 50px;"></table>-->

<?php
if(array_key_exists('search', $_POST)) { 
	
	$street = $_POST['street'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$currentLocation = $_POST['currentLocation'];
	$notDisplayError=False;
	if($currentLocation){
		$lat=$_POST['hiddenLatitude'];
		$lon=$_POST['hiddenLongitude'];
		$city=$_POST['hiddenCity'];
		$notDisplayError=True;
	} 
	elseif((!empty($street) && !empty($city) && $state!='XX' && $state!='YY')){
		
		$url='https://maps.googleapis.com/maps/api/geocode/xml?address='.urlencode($street).','.urlencode($city).','.$state.'&key=AIzaSyDh0G4TJEMCEEcSohFZzzKCPxmX1OMaQdw';
		$response = file_get_contents($url);
		$element = new SimpleXMLElement($response);
		$lat= (string)$element->result[0]->geometry[0]->location[0]->lat;
		$lon= (string)$element->result[0]->geometry[0]->location[0]->lng;
		
		if(($element->status)=='OK') $notDisplayError=True;
	}
	if($notDisplayError){
	$forecastURL='https://api.forecast.io/forecast/8198317849d928d036739acf9583118e/'.$lat.','.$lon.'?exclude=minutely,hourly,alerts,flags';
	$forecastResponse = file_get_contents($forecastURL);
	$forecastJSON = json_decode($forecastResponse);
	
	$humidity='none';
	$pressure='none';
	$windSpeed='none';
	$visibility='none';
	$cloudCover='none';
	$ozone='none';
	$ctr=0;
	if(!is_null($forecastJSON->currently->humidity) && !empty($forecastJSON->currently->humidity) && $forecastJSON->currently->humidity!=0){
		$ctr++;
		$humidity='inline-block';
	} 
	if(!is_null($forecastJSON->currently->pressure) && !empty($forecastJSON->currently->pressure) && $forecastJSON->currently->pressure!=0){
		$ctr++;
		$pressure='inline-block';
	} 
	if(!is_null($forecastJSON->currently->windSpeed) && !empty($forecastJSON->currently->windSpeed) && $forecastJSON->currently->windSpeed!=0){
		$ctr++;
		$windSpeed='inline-block';
	} 
	if(!is_null($forecastJSON->currently->visibility) && !empty($forecastJSON->currently->visibility) && $forecastJSON->currently->visibility!=0){
		$ctr++;
		$visibility='inline-block';
	} 
	if(!is_null($forecastJSON->currently->cloudCover) && !empty($forecastJSON->currently->cloudCover) && $forecastJSON->currently->cloudCover!=0){
		$ctr++;
		$cloudCover='inline-block';
	} 
	if(!is_null($forecastJSON->currently->ozone) && !empty($forecastJSON->currently->ozone) && $forecastJSON->currently->ozone!=0){
		$ctr++;
		$ozone='inline-block';
	} 
	
	$t = 370/$ctr;
	echo '<br>';
	echo '<table id="cardView" style="margin: auto; background-color: #34bdeb; border-radius:10px; padding: 20px; width: 450px;">
		<tr>
			<td colspan="6" style="color: #ffffff; font-size: 30px; font-weight: bold;">'.$city.'</td>
		</tr>
		<tr>
			<td colspan="6" style="color: #ffffff; font-size: 15px;">'.$forecastJSON->timezone.'</td>
		</tr>
		<tr>
			<td colspan="6" style="color: #ffffff; font-size: 70px; font-weight: bold;">'.round($forecastJSON->currently->temperature).'<img src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png" alt="Degree Image" align="top" height="10" width="10"><span style="font-size: 50px;">F</span></td>
		</tr>
		<tr>
			<td colspan="6" style="color: #ffffff; font-size: 30px; font-weight: bold;">'.$forecastJSON->currently->summary.'</td>
		</tr>
		<tr>
		<td style="text-align: center; width: '.$t.'px; display: '.$humidity.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png" title="Humidity" alt="Humidity Image" height="30" width="30"></td>
		<td style="text-align: center; width: '.$t.'px; display: '.$pressure.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png" title="Pressure" alt="Pressure Image" height="30" width="30"></td>
		<td style="text-align: center; width: '.$t.'px; display: '.$windSpeed.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png" title="WindSpeed" alt="Wind Speed Image" height="30" width="30"></td>
		<td style="text-align: center; width: '.$t.'px; display: '.$visibility.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png" title="Visibility" alt="Visibility Image" height="30" width="30"></td>
		<td style="text-align: center; width: '.$t.'px; display: '.$cloudCover.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png" title="CloudCover" alt="Cloud Cover Image" height="30" width="30"></td>
		<td style="text-align: center; width: '.$t.'px; display: '.$ozone.';"><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png" title="Ozone" alt="Ozone Image" height="30" width="30"></td>
		</tr>
		<tr>
		<td style="text-align: center; width: '.$t.'px; display: '.$humidity.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->humidity.'</td>
		<td style="text-align: center; width: '.$t.'px; display: '.$pressure.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->pressure.'</td>
		<td style="text-align: center; width: '.$t.'px; display: '.$windSpeed.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->windSpeed.'</td>
		<td style="text-align: center; width: '.$t.'px; display: '.$visibility.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->visibility.'</td>
		<td style="text-align: center; width: '.$t.'px; display: '.$cloudCover.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->cloudCover.'</td>
		<td style="text-align: center; width: '.$t.'px; display: '.$ozone.'; color: #ffffff; font-size: 20px; font-weight: bold;">'.$forecastJSON->currently->ozone.'</td>
		</tr>
	</table><br><br>';
	
	$statusIcon = array("clear-day"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png", 
						"clear-night"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png", 
						"rain"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-04-512.png",
						"snow"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-19-512.png",
						"sleet"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-07-512.png",
						"wind"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png",
						"fog"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png",
						"cloudy"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-01-512.png",
						"partly-cloudy-day"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png",
						"partly-cloudy-night"=>"https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png");
	$tableString = '<table id="tableView" style="margin: auto; background-color: #87bbe6; padding: 8px; width: 720px;">
		<tr>
			<td>Date</td>
			<td>Status</td>
			<td>Summary</td>
			<td>TemperatureHigh</td>
			<td>TemperatureLow</td>
			<td style="width: 100px">Wind Speed</td>
		</tr>';
		$dt = new DateTime("now", new DateTimeZone($forecastJSON->timezone));
		foreach($forecastJSON->daily->data as $item){
			$dt->setTimestamp($item->time);
			$tableString.='<tr>
			<td>'.$dt->format('Y-m-d').'</td>
			<td><img src="'.$statusIcon[$item->icon].'" height="30" width="30"></td>
			<td><a style="cursor: pointer;" onclick="myFunction('.$item->time.')">'.$item->summary.'</a></td>
			<td>'.$item->temperatureHigh.'</td>
			<td>'.$item->temperatureLow.'</td>
			<td>'.$item->windSpeed.'</td>
			</tr>';
		}
	echo $tableString.'</table>';
	
	echo '<form method="POST" id="hiddenForm" style="display:none;">
		<input type="text" id="hidLatitude" name="hidLatitude" value="'.$lat.'">
		<input type="text" id="hidLongitute" name="hidLongitute" value="'.$lon.'">
		<input type="text" id="hidTime" name="hidTime">
		</form>';
	}
	else echo '<br><table id="errorText" bgcolor="#dedee0" style="margin: auto; font-size:15px; border: 2px solid #7c7c7d; padding-left: 50px; padding-right: 50px;"><tr><td>Please check the input address.</td></tr></table>';
}

if(array_key_exists('hidSubmit1', $_POST)) { 
	$dailyURL='https://api.darksky.net/forecast/8198317849d928d036739acf9583118e/'.$_POST['hidLatitude1'].','.$_POST['hidLongitute1'].','.$_POST['hidTime1'].'?exclude=minutely';
	$dailyResponse = file_get_contents($dailyURL);
	$dailyJSON = json_decode($dailyResponse);
	
	$timeArray = array("00"=>"0","01"=>"1","02"=>"2","03"=>"3","04"=>"4","05"=>"5","06"=>"6","07"=>"7","08"=>"8","09"=>"9","10"=>"10","11"=>"11","12"=>"12");
	$precipitation = $dailyJSON->currently->precipIntensity;
	if($precipitation<=0.001) $precipitationDisplay = 'None';
	elseif($precipitation<=0.015) $precipitationDisplay = 'Very Light';
	elseif($precipitation<=0.05) $precipitationDisplay = 'Light';
	elseif($precipitation<=0.1) $precipitationDisplay = 'Moderate';
	else $precipitationDisplay = 'Heavy';
	
	$weatherIcon = array("clear-day"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
						"clear-night"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
						"rain"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png",
						"snow"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png",
						"sleet"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png",
						"wind"=>"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png",
						"fog"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png",
						"cloudy"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png",
						"partly-cloudy-day"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png",
						"partly-cloudy-night"=>"https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png");
				
	$tz = $dailyJSON->timezone;
	$dt_sunrise = new DateTime("now", new DateTimeZone($tz));
	$dt_sunrise->setTimestamp($dailyJSON->daily->data[0]->sunriseTime);
	$dt_sunset = new DateTime("now", new DateTimeZone($tz));
	$dt_sunset->setTimestamp($dailyJSON->daily->data[0]->sunsetTime); 
	echo '<h1 align="center">Daily Weather Detail</h1>
	<table id="dailyWeatherView" style="margin: auto; background-color: #90c7e0; border-radius:15px; padding:5px; width: 420px;">
		<tr>
			<td style="display: inline-block; width: 100px;"></td>
			<td style="display: inline-block; width: 100px;"></td>
			<td rowspan="3" colspan="6" align="right"><img src="'.$weatherIcon[$dailyJSON->currently->icon].'" align="center" height="200" width="200"></td>
		</tr>
		<tr>
			<td colspan="2" style="font-size: 30px; padding-left:10px; width: 100px; word-wrap: break-word;">'.$dailyJSON->currently->summary.'</td>
		</tr>
		<tr>
			<td colspan="2" style="font-size: 90px; padding-left:10px;">'.round($dailyJSON->currently->temperature).'<img src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png" align="top" height="10" width="10"><span style="font-size: 60px;">F</span></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Precipitation:</td>
			<td style="font-size: 20px; width: 150px;">'.$precipitationDisplay.'</td>
			<td style="width: 100px;"></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Chance of Rain:</td>
			<td style="font-size: 20px;">'.round($dailyJSON->currently->precipProbability*100).'&nbsp;<span style="font-size: 13px;">%</span></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Wind Speed:</td>
			<td style="font-size: 20px;">'.$dailyJSON->currently->windSpeed.'&nbsp;<span style="font-size: 13px;">mph</span></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Humidity:</td>
			<td style="font-size: 20px;">'.round($dailyJSON->currently->humidity*100).'&nbsp;<span style="font-size: 13px;">%</span></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Visibility:</td>
			<td style="font-size: 20px;">'.$dailyJSON->currently->visibility.'&nbsp;<span style="font-size: 13px;">mi</span></td>
		</tr>
		<tr>
			<td style="width: 200px;"></td>
			<td align="right">Sunrise&nbsp;/&nbsp;Sunset:</td>
			<td style="font-size: 20px;">'.$timeArray[$dt_sunrise->format('h')].'&nbsp;<span style="font-size: 13px;">AM/&nbsp;</span>'.$timeArray[$dt_sunset->format('h')].'&nbsp;<span style="font-size: 13px;">PM</span></td>
		</tr>
	</table>
	<h1 align="center">Day\'s Hourly Weather</h1>
	<div align="center"><img id="display" src="https://cdn4.iconfinder.com/data/icons/geosm-e-commerce/18/point-down-512.png" style="cursor: pointer;" onclick="displayGraph();" height="50" width="50"></div>
	<div align="center"><img id="hide" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ExpandLess-512.png" style="display: none; cursor: pointer;" onclick="hideGraph();" height="50" width="50"><br></div>';
	
	$temperatureArray;
	$count=0;
	foreach($dailyJSON->hourly->data as $hour){
		$temperatureArray.= '['.$count.','.$hour->temperature.']';
		$count++;
		if($count<count($dailyJSON->hourly->data)) $temperatureArray.=',';
	}
	
	echo '<div id="chart_div" style="margin: auto; width: 800px; visibility: hidden;"></div>
	<script>
	google.charts.load("current", {packages: ["corechart", "line"]});
	google.charts.setOnLoadCallback(drawBasic);
	function drawBasic() {
	  var data = new google.visualization.DataTable();
      data.addColumn("number", "X");
      data.addColumn("number", "T");
	  data.addRows(['.$temperatureArray.']);
	  var options = {
        hAxis: {
          title: "Time"
        },
        vAxis: {
          title: "Temperature",
          textPosition: "none"
        },
        colors:["#72d0e0"]
      };
      var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
	 chart.draw(data, options);
    }</script>';
}
?>
</body>
</html>
