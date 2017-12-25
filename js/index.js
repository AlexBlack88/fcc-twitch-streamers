//Client ID = t6ixvh8qorki1wd3b8ba741w81lzas

// streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function(){

  var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp","habathcx", "RobotCaleb", "noobs2ninjas"];
  
  var clientId = 't6ixvh8qorki1wd3b8ba741w81lzas';
  
  var url = 'https://api.twitch.tv/kraken/streams/freecodecamp?client_id=' + clientId + '';
  
  var name;
  var id;
  var link;
  var logo;
  var content;
  var noLogo = 'http://robonwriting.com/wp-content/uploads/2013/04/no-avatar-male.jpg';
  
 
  $.getJSON(url, function(data1) {
    
    if(data1.stream === null) {
      $('#fcc').html('Free Code Camp is now OFFLINE');
   } 
   else {
     $('#fcc').html('Free Code Camp is now ONLINE!');
   }
    
  });
  
  $.each( streams, function( i, val ) {
 
    $.getJSON('https://api.twitch.tv/kraken/streams/'+ val + '?client_id=' + clientId, function(st){
		
		name = val;
		
		
		if(st.stream === null) {
			$.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?client_id=' + clientId, function(ch){
      if(ch.logo === null) {
          ch.logo = noLogo;
      } else
        
				id = ch.display_name;
				logo = ch.logo;
				link = ch.url;
				content = ch.status;
				
				
				
			    if (ch.status === '404'){
					
					$('#notFound').append('<div class="row"><h4>'+ id +'</h4><p>'+ ch.message +'</p></div>');
				}
			    else {
					$('#offline').append('<div class="row"><div class="col-md-6"><a href='+ link +' target="_blank"><img src='+ logo +' alt="Logo" class="img-circle"></a></div><div class="col-md-6"><a href='+ link +' target="_blank"><h4>'+ id +'</h4></a><p>Now is OFFLINE!</p></div></div><div class="divider"></div>');
				}
			});
		}
		else {
			$.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?client_id=' + clientId, function(ch){
				id = ch.display_name;
				logo = ch.logo;
				link = ch.url;
				content = ch.status;
				
				$('#online').append('<div class="row"><div class="col-md-6"><a href='+ link +' target="_blank"><img src='+ logo +' alt="Logo" class="img-circle"></a></div><div class="col-md-6"><a href='+ link +' target="_blank"><h4>'+ id +'</h4></a><p>'+ content +'</p></div></div><div class="divider"></div>');
		    });
		}
	});
  
  
  
});

  $('#all').click(All);
  $('#on').click(Online);
  $('#off').click(Offline);
  
  function All(){
	  $('#online').show();
	  $('#offline').show();
	  $('#notFound').show();
  }
  
   function Online(){
	  $('#online').show();
	  $('#offline').hide();
	  $('#notFound').hide();
  }
  
   function Offline(){
	  $('#online').hide();
	  $('#offline').show();
	  $('#notFound').hide();
  }
    
  });