;(function() {
  document.addEventListener("DOMContentLoaded", function() {

    const static_data = {
      "nodes": [
        {
          "title": "21: Enerhaugen - Surroundings",
          "date": "June - Nov 2021",
          "color": "#10a100",
          "type": "track",
          "file": "21-walk.mp3",
          "sidetracks": [
            {"file":"threebranchesfalling.mp3","at":"3:43"},
            {"file":"metropassing.mp3","at":"6:35"},
            {"file":"pathtypes.mp3","at":"11:10"}]
        },
        {
          "title": "22: Enerhaugen - Constructions",
          "date": "June - Nov 2021",
          "color": "#d44e65",
          "type": "track",
          "file": "22-walk.mp3",
          "sidetracks": [
            {"file":"drillingbetweenbuildings.mp3","at":"9:10"}]
        },
        {
          "title": "23: Enerhaugen - Air",
          "date": "June - Nov 2021",
          "color": "#0096ed",
          "type": "track",
          "file": "23-walk.mp3",
          "sidetracks": [
            {"file":"threebranchesfalling.mp3","at":"2:24"}]
        },
        {
          "title": "24: Enerhaugen - Allotments",
          "date": "June - Nov 2021",
          "color": "#ffd000",
          "type": "track",
          "file": "24-walk.mp3",
          "sidetracks": [
            {"file":"chives.mp3","at":"5:05"}]
        },
        {
          "title": "Three branches falling off a tree",
          "file": "threebranchesfalling.mp3",
          "type": "sidetrack",
          "nexus": "Flora"
        },
        {
          "title": "Metro passing underneath Enerhaugen",
          "file": "metropassing.mp3",
          "type": "sidetrack",
          "nexus": "Trails"
        },
        {
          "title": "Path types",
          "file": "pathtypes.mp3",
          "type": "sidetrack",
          "nexus": "Trails"
        },
        {
          "title": "Drilling echoing between buildings",
          "file": "drillingbetweenbuildings.mp3",
          "type": "sidetrack"
        },
        {
          "title": "Chives",
          "file": "chives.mp3",
          "type": "sidetrack",
          "nexus": "Flora"
        }
      ]
    };

    function makeSafeForCSS(name) {
      return name.replace(/[^a-z0-9]/g, function(s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '';
        if (c >= 65 && c <= 90) return '' + s.toLowerCase();
        return '' + ('000' + c.toString(16)).slice(-4);
      });
    }

    function hashCode(s) {
      let h=0;
      for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
      return h;
    }

    function short_class_name(s) {
      var str = btoa(hashCode(s));
      return "t" + makeSafeForCSS(str.slice(0,-2).substring(2, str.length));
    }

    function clamp(x, lo, hi) {
      return x < lo ? lo : x > hi ? hi : x;
    }

    function linkArc(x1,y1,x2,y2) {
      const r = Math.hypot(x2 - x1, y2 - y1);
      return `
    M${x1},${y1}
    A${r},${r} 0 0,1 ${x2},${y2}
  `;
    }

    function toMS(str) {
      if(!str.includes(":"))
        return parseFloat(str);
      const [mins, secms] = str.split(":");
      const [sec, ms] = secms.split(".");
      if (ms) {
        return ((+mins * 60) + +sec) * 1000 + +ms;
      } else {
        return ((+mins * 60) + +sec) * 1000;
      }
    }

    function fmtMSS(ls){var s = Math.floor(ls); return(s-(s%=60))/60+(9<s?':':':0')+s}

    function makeAbsoluteContext(element, svgDocument) {
      return function(x,y) {
        var offset = svgDocument.getBoundingClientRect();
        var matrix = element.getScreenCTM();
        return {
          x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
          y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
        };
      };
    }

    // =================================
    // =================================
    // =================================
    // =================================

    // Initial Load and Setup

    // =================================
    // =================================
    // =================================
    // =================================

    const width = window.innerWidth;
    const height = window.innerHeight;
    const map_application = document.getElementById("map_application");

    document.body.contains(map_application);

    let zoom = d3.zoom()
      .on('zoom', handleZoom);

    function handleZoom(e) {
      d3.select("svg g")
        .attr('transform', e.transform);
    }

    function initZoom() {
      d3.select('svg')
        .call(zoom)
        .transition().duration(2000).call(zoom.transform, d3.zoomIdentity.translate(width/3.0, height/3.0).scale(0.33));
    }

    var num_loaded = 0;
    var total_audio_files = 0;
    var counted = false;
    var all_done = false;

    function metadataListner (event) {
      num_loaded += 1;
      console.log(num_loaded);
      console.log(" -- ");
      if (num_loaded >= total_audio_files) {
        all_done = true;
        console.log("all done");
      }
    }

    var node_data = null;
    var link_data = [];
    var visible_link_data = [];

    const start_button = d3.select("#start");
    start_button.classed("hide", true);

    (function(data) {

      var nexus_data = [];

      node_data = data.nodes.map(d => {
        if (d.type == "track" || d.type == "sidetrack") {

          const local_id = short_class_name(d.file);

          const audio_element = document.createElement("audio");
          const audio_element_selection = d3.select(audio_element)
            .attr("id", local_id)
            .attr("preload", "auto")
            .attr("src", d.file)
            .classed("audio_element", true);
          console.log("arghhhh");

          const audio_node = map_application.appendChild(audio_element_selection.node());
          audio_element.onloadedmetadata= metadataListner;

          d.audio_element = audio_element;
          d.id = local_id;

          // Track Specific
          if (d.type == "track") {

            if(d.sidetracks) {
              d.sidetracks = d.sidetracks.map(x => {
                x["float"] = toMS(x.at) / 1000.0;
                x["id"] = short_class_name(x.file);
                return x;
              });
              d.sidetracks.forEach(element => {

                link_data.push({
                  "source": local_id,
                  "target": element.id,
                  "duration_a": "1:00",
                  "duration_b": "1:00",
                  "type": "sidetrack"
                });

                visible_link_data.push({
                  "source": local_id + "-" + element.at.replace(/([^a-z0-9]+)/gi, '-'),
                  "target": element.id + "-enter",
                  "color": d.color
                });

              });
            }
          }

          // Sidetrack Specific
          if (d.type == "sidetrack") {

            // Make a nexus link
            if(d.nexus) {

              var has_nexus = nexus_data.findIndex(element => element.title == d.nexus);
              var nexus_id = short_class_name(d.nexus);
              d["nexus_id"] = nexus_id;

              if (has_nexus < 0) {
                nexus_data.push(Object.create({
                  "id": nexus_id,
                  "title": d.nexus,
                  "type": "nexus",
                  "connections": [{"id": local_id, "title": d.title, "type": "sidetrack"}]
                }));
              } else {
                nexus_data[has_nexus]["connections"].push({"id": local_id, "title": d.title, "type": "sidetrack"});
              }

              link_data.push({
                "source": local_id,
                "target": nexus_id,
                //ToDo: Fill in later?
                "duration_a": "1:00",
                "duration_b": "1:00",
                "type": "nexus"
              });

              visible_link_data.push({
                "source": local_id + "-exit",
                "target": nexus_id,
                "color": null
              });
            }

          }

          return Object.create(d);
        } else {
          // Nexus elements don't need much processing.
          //return Object.create(d);
        }

      }); //EO Node Data Map
      


      node_data = node_data.concat(nexus_data);

      start_button.classed("hide", false);

    })(static_data);

    // =================================
    // =================================
    // =================================
    // =================================

    // On Click Area

    // =================================
    // =================================
    // =================================
    // =================================

    start_button.on("click", function () {

      var question_overlay = d3.select(".question_overlay");
      var option_wrapper = d3.select(".option_wrapper");

      const event_track_move = new Event('track_move');
      const event_choice = new Event('choice');

      var constant_timeout = null;

      d3.select(".map_intro_wrapper").remove();

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      const station_chime = document.getElementById("station");
      const station_media_source = audioContext.createMediaElementSource(station_chime);
      station_media_source.connect(audioContext.destination);

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      var playhead_interval = null;
      var playhead_position = null;

      var current_audio_element = null;
      var current_track_element = null;
      var current_media_source = null;

      var last_main_track = null;

      // =================================
      // =================================
      // =================================
      // =================================

      // Play Area

      // =================================
      // =================================
      // =================================
      // =================================

      function manage_playback(e,d) {
        var path = e.path || (e.composedPath && e.composedPath());

        if (d.audio_element.duration > 0 && !d.audio_element.paused) {

          d.audio_element.pause();
          d3.select(document.querySelector('[data-id="' + d.id + '"]')).attr("xlink:href", "play.png");
          clearInterval(playhead_interval);
          return;

        }

        if (current_audio_element == d.audio_element &&
          d.audio_element.duration > 0 &&
          d.audio_element.paused) {

          d3.select(document.querySelector('[data-id="' + d.id + '"]')).attr("xlink:href", "pause.png");
          d.audio_element.play();
          return;

        }

        if (current_audio_element && d.audio_element != current_audio_element) {

          if (current_audio_element.duration > 0 && !current_audio_element.paused) {
            current_media_source.disconnect(audioContext.destination);
            current_audio_element.pause();
            //current_audio_element.currentTime = 0;
            clearInterval(playhead_interval);
            playhead_position = 0;
            //note should we move the old playhead back?
          }

        }

        current_media_source = d.media_source;
        current_audio_element = d.audio_element;
        current_track_element = path[1];

        if (d.type == "track") {
          last_main_track = {"id": d.id, "title": d.title, "type": "track"};
        }

        d.media_source.connect(audioContext.destination);
        // Do I need to disconnect?
        d.audio_element.play();

        d3.selectAll(".node-highlight").transition().duration(750).style("opacity", 0.0);
        d3.select("#" + d.id + "-highlight").transition().duration(750).style("opacity", 1.0);

        d3.selectAll(".play_button").attr("xlink:href", "play.png");
        d3.select(document.querySelector('[data-id="' + d.id + '"]')).attr("xlink:href", "pause.png");

        if (d.type == "sidetrack" && d.nexus) {

          var local_nexus_data = d3.select(document.getElementById(d.nexus_id)).datum();

          d.audio_element.addEventListener("ended", function() {

            station_chime.currentTime = 0;
            station_chime.play();

            path[1].dispatchEvent(event_choice);

            question_overlay.classed("open", true);
            option_wrapper.selectAll("*").remove();

            var connections_minus_current = local_nexus_data.connections.filter(e => e.id != d.id);

            if (last_main_track) {
              connections_minus_current = [last_main_track, ...connections_minus_current]
            }

            if (connections_minus_current.length) {
              if (constant_timeout) { clearInterval(constant_timeout); };
              constant_timeout = setTimeout(function() {

                question_overlay.classed("open", false);
                var item = connections_minus_current[Math.floor(Math.random()*local_nexus_data.connections.length)];
                var track_play_button = d3.select(document.querySelector('[data-id="' + item.id + '"]'));
                track_play_button.dispatch("click");

              }, 10000);

              connections_minus_current.forEach(element => {

                var track_play_button = d3.select(document.querySelector('[data-id="' + element.id + '"]'));

                option_wrapper
                  .append("button")
                  .classed("backtrack", element.type == "track" ? true : false)
                  .text(element.title)
                  .on("click", function(e){
                    if (constant_timeout) { clearInterval(constant_timeout); };
                    question_overlay.classed("open", false);
                    track_play_button.dispatch("click");
                  });

              });
            }

          }, false);

          //d.audio_element.removeEventListener("mousedown", handleMouseDown, false);

        }

        d3.selectAll(".playhead_object")
          .attr("xlink:href", "mark.png")
          .attr("transform", "translate(-32 -32)")
          .attr('width', 64)
          .attr('height', 64);

        const track_playhead = d3.select(current_track_element).select(".playhead_object");

        track_playhead.transition().duration(720).style("opacity", 1.0);

        track_playhead.attr("xlink:href", "finger.png")
          .attr("transform", "translate(-64 -64)")
          .attr('width', 128)
          .attr('height', 128);

        var session_sidetracks = d.sidetracks;

        playhead_interval = setInterval( function () {
          if (!d.audio_element.paused) {
            playhead_position = d.audio_element.currentTime;

            path[1].dispatchEvent(event_track_move);

            if (session_sidetracks) {
              session_sidetracks.forEach(function(sidetrack, index) {

                if (!sidetrack["played"] &&
                  playhead_position >= sidetrack.float &&
                  playhead_position <= sidetrack.float + 0.256) {

                  this[index]["played"] = true;

                  d.audio_element.pause();

                  station_chime.currentTime = 0;
                  station_chime.play();

                  path[1].dispatchEvent(event_choice);

                  var track_play_button = d3.select(document.querySelector('[data-id="' + sidetrack.id + '"]'));

                  question_overlay.classed("open", true);
                  option_wrapper.selectAll("*").remove();

                  if (constant_timeout) { clearInterval(constant_timeout); };
                  constant_timeout = setTimeout(function() {
                    question_overlay.classed("open", false);
                    // Continue Playback On Timeout
                    d.audio_element.play();
                  }, 10000);

                  option_wrapper
                    .append("button")
                    .text("Continue this track")
                    .on("click", function(e){
                      if (constant_timeout) { clearInterval(constant_timeout); };
                      question_overlay.classed("open", false);
                      d.audio_element.play();
                    });

                  option_wrapper
                    .append("button")
                    .text("Take the sidetrack")
                    .on("click", function(e){
                      if (constant_timeout) { clearInterval(constant_timeout); };
                      question_overlay.classed("open", false);
                      track_play_button.dispatch("click");
                    });

                } }, session_sidetracks);

            } } }, 64);
      } // EO Playback

      // =================================
      // =================================
      // =================================
      // =================================

      // Final Data Prep

      // =================================
      // =================================
      // =================================
      // =================================

      node_data = node_data.map(d => {
        if (d.type == "nexus") {
          return d;
        } else {
          var lms = audioContext.createMediaElementSource(d.audio_element);
          d["media_source"] = lms;
          d["duration"] = lms.mediaElement.duration;
          return d;
        }
      });

      link_data = link_data.map(d => {
        var local_source = node_data.find(element => element.id == d.source);
        if (d.type === "nexus") {
          d["duration_a"] = fmtMSS(local_source.duration);
          return d;
        } else {
          var local_target = node_data.find(element => element.id == d.target);
          d["duration_a"] = fmtMSS(local_source.duration);
          d["duration_b"] = fmtMSS(local_target.duration);
          return d;
        }
      });

      const simulation = d3.forceSimulation(node_data)
        .alphaTarget(0.025)
        .alphaMin(0.1)
        .alphaDecay(0.05)
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.25))
        .force("link", d3.forceLink(link_data).id(d => d.id).distance(d => {
          switch(d.type) {
            case "track":
              return (toMS(d.duration_a) / 1000.0 + toMS(d.duration_b) / 1000.0);
            case "sidetrack":
              return (toMS(d.duration_a) / 1000.0 + toMS(d.duration_b) / 1000.0);
            default:
              return 128;
          }
        }))
        .force("collision", d3.forceCollide().radius(d => {
          switch(d.type) {
            case "track":
              return d.duration; 
            case "sidetrack":
              return d.duration;
            default:
              return 64;
          }
        }));

      const svg_o = d3.create("svg")
        .classed("map_container", true)
        .attr("width", "100%")
        .attr("height", "100%");

      var defs = svg_o.append("defs");
      defs.append("radialGradient")
        .attr("id", "sun-gradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .selectAll("stop")
        .data([
          {offset: "0%", color: "rgba(255,255,255,0.4"},
          {offset: "33.33%", color: "rgba(255,255,255,0.33)"},
          {offset: "66.66%", color: "rgba(255,255,255,0.127)"},
          {offset: "100%", color: "rgba(255,255,255,0"}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

      const svg = svg_o.append("g");

      const nodes_highlight =
        svg.append("g")
        .selectAll(".node-highlight")
        .data(node_data)
        .join("circle")
        .style("fill", "url(#sun-gradient)")
        .style("stroke-width", 0)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", d => d.duration ? d.duration : 0)
        .style("opacity", 0)
        .attr("id", d => d.id + "-highlight")
        .attr("class", "node-highlight");

      const visible_links = svg.append("g")
        .attr("stroke-opacity", 0.8)
        .attr("fill", "none")
        .attr("stroke-width", 6)
        .style("stroke-dasharray", ("8, 16"))
        .attr("stroke-linecap","round")
        .selectAll("path")
        .data(visible_link_data)
        .join("path")
        .attr("stroke", d => d.color ? d.color : "#999" );

      const nodes = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll(".node-container")
        .data(node_data)
        .join("g")
        .style("opacity", 0.3)
        .attr("class", "node-container");

      var tracks =
        nodes.filter(d => d.type == "track")
        .append("g")
        .attr("class", d => d.type)
        .on("track_move", function(e,d) {
          d3.select(this).select(".playhead_object").attr('y', -(d.duration / 2.0) + playhead_position );
        })
        .on("choice", function(e,d) {
          d3.select(this).select(".playhead_choice").attr('y', -(d.duration / 2.0) + playhead_position );
        });

      tracks.append("line")
        .style("stroke", d => d.color)
        .style("stroke-width", 12)
        .attr("x1", 0)
        .attr("stroke-linecap","round")
        .attr("y1", d => -(d.duration / 2.0))
        .attr("x2", 0)
        .attr("y2", d => d.duration / 2.0);

      var titles = tracks
        .append("text")
        .style("font-size", "36px")
        .style("fill", "#333")
        .style("stroke", "none")
        .attr("x", 50)
        .attr("y", d => -(d.duration / 2.0) + 16)
        .text(d => d.title);

      var dates = tracks
        .append("text")
        .style("font-size", "24px")
        .style("fill", "#333")
        .style("stroke", "none")
        .attr("x", 50)
        .attr("y", d => -(d.duration / 2.0) + 52)
        .text(d => d.date);

      var players = tracks
        .append("svg:image")
        .classed("play_button", true)
        .attr("data-id", d => d.id)
        .style("cursor", "pointer")
        .attr('x', 32)
        .attr('y', d => -(d.duration / 2.0) + 60)
        .attr('width', 96)
        .attr('height', 96)
        .attr("xlink:href", "play.png")

      players.on("click", manage_playback);

      var track_node = tracks.selectAll(null)
        .data(d => d.sidetracks.map(v => ({...v, od: d.duration , oid: d.id})))
        .enter()
        .append("svg:image")
        .attr("id", d => d.oid + "-" + d.at.replace(/([^a-z0-9]+)/gi, '-'))
        .attr("transform", "translate(-32 -32)")
        .attr('x', 0)
        .attr("y", d => (toMS(d.at) / 1000.0 ) - (d.od / 2.0))
        .attr('width', 64)
        .attr('height', 64)
        .attr("xlink:href", "sidemark.png")

      var playhead_object = tracks
        .append("svg:image")
        .classed("playhead_object", true)
        .style("opacity", 0)
        .attr("transform", "translate(-32 -32)")
        .attr('x', 0)
        .attr('y', d => -(d.duration / 2.0))
        .attr('width', 64)
        .attr('height', 64)
        .attr("xlink:href", "mark.png")

      var deltaX, deltaY;
      var dragHandler = d3.drag()
        .on("start", function (event) {
          var current = d3.select(this);
          deltaY = current.attr("y") - event.y;
          current_audio_element.pause();
        })
        .on("drag", function (event) {
          var current = d3.select(this);
          current.attr("y", d => clamp(event.y + deltaY, -(d.duration / 2.0), (d.duration / 2.0)));
        })
        .on("end", function (event) {
          var half_duration = event.subject.duration / 2.0;
          var new_playpoint = (clamp(event.y + deltaY, -half_duration, half_duration) + half_duration);
          playhead_position = new_playpoint;
          current_audio_element.currentTime = playhead_position;
          current_audio_element.play();
        });

      dragHandler(playhead_object);

      var sidetracks =
        nodes.filter(d => d.type == "sidetrack")
        .append("g")
        .attr("class", d => d.type)
        .on("track_move", function(e,d) {
          d3.select(this).select(".playhead_object").attr('y', -(d.duration / 2.0) + playhead_position );
        })
        .on("choice", function(e,d) {
          d3.select(this).select(".playhead_choice").attr('y', -(d.duration / 2.0) + playhead_position );
        });

      sidetracks.append("line")
        .style("stroke", "white")
        .style("stroke-width", 8)
        .attr("stroke-linecap","round")
        .attr("x1", 0)
        .attr("y1", d => -(d.duration / 2.0))
        .attr("x2", 0)
        .attr("y2", d => d.duration / 2.0);

      sidetracks.append("circle")
        .style("fill", "#fff")
        .style("stroke", "white")
        .style("stroke-width", 2)
        .attr("cx", 0)
        .attr("cy", d => -(d.duration / 2.0))
        .attr("r", 8)
        .attr("id", d => d.id.replace(/([^a-z0-9]+)/gi, '-'))
        .attr("id", d => d.id + "-enter");

      sidetracks.append("circle")
        .style("fill", "#fff")
        .style("stroke", "white")
        .style("stroke-width", 2)
        .attr("cx", 0)
        .attr("cy", d => d.duration / 2.0)
        .attr("r", 8)
        .attr("id", d => d.id + "-exit");

      var side_playhead_object = sidetracks
        .append("svg:image")
        .classed("playhead_object", true)
        .style("opacity", 0.0)
        .attr("transform", "translate(-32 -32)")
        .attr('x', 0)
        .attr('y', d => -(d.duration / 2.0))
        .attr('width', 64)
        .attr('height', 64)
        .attr("xlink:href", "mark.png")

      dragHandler(side_playhead_object);

      var side_titles = sidetracks
        .append("text")
        .style("font-size", "18px")
        .style("fill", "#333")
        .style("stroke", "none")
        .attr("x", 20)
        .attr("y", d => -(d.duration / 2.0))
        .text(d => d.title);

      var side_players = sidetracks
        .append("svg:image")
        .classed("play_button", true)
        .attr("data-id", d => d.id)
        .style("cursor", "pointer")
        .attr('x', 10)
        .attr('y', d => -(d.duration / 2.0) + 8)
        .attr('width', 64)
        .attr('height', 64)
        .attr("xlink:href", "play.png")

      side_players.on("click", manage_playback);

      var nexus =
        nodes.filter(d => d.type == "nexus");

      nexus.append("circle")
        .attr("r",20)
        .attr("fill", "#fff")
        .attr("stroke","#000")
        .attr("stroke-width", 6)
        .style("stroke-dasharray", ("6, 12"))
        .attr("id", d => d.id);

      var nexus_titles = nexus
        .append("text")
        .style("font-size", "42px")
        .style("fill", "#333")
        .style("stroke", "none")
        .attr("x", 0)
        .attr("y", -32)
        .style("text-anchor", "middle")
        .text(d => d.title);

      const loading_indicator = svg.append("text")
        .text("Organizing...")
        .style("font-size", "64px")
        .style("fill", "#fff")
        .style("stroke", "none")
        .attr('text-anchor', 'middle')
        .attr("x", width/2.0)
        .attr("y", height/2.0);

      loading_indicator.append("circle")
        .attr("r",20)
        .attr("fill", "#fff")
        .attr("stroke","#000")
        .attr("stroke-width", 6)
        .style("stroke-dasharray", ("6, 12"));

      simulation.on("tick", () => {
        visible_links.each(function(p,j) {
          var source = document.getElementById(p.source);
          var target = document.getElementById(p.target);

          var bbox_s = source.getBBox(),
            middleX_s = bbox_s.x + (bbox_s.width / 2),
            middleY_s = bbox_s.y + (bbox_s.height / 2);

          var convert_s = makeAbsoluteContext(source, svg_o.node());
          var absoluteCenter_s = convert_s(middleX_s, middleY_s);

          var bbox_t = target.getBBox(),
            middleX_t = bbox_t.x + (bbox_t.width / 2),
            middleY_t  = bbox_t.y + (bbox_t.height / 2);

          var convert_t = makeAbsoluteContext(target, svg_o.node());
          var absoluteCenter_t = convert_t(middleX_t, middleY_t);

          d3.select(this).attr("d",
            d => linkArc(absoluteCenter_s.x, absoluteCenter_s.y, absoluteCenter_t.x, absoluteCenter_t.y));
        });

        nodes_highlight.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
        nodes.attr("transform", d => "translate(" + d.x + "," + d.y + ")");

      }).on("end", function (){

        loading_indicator.remove();
        nodes.style("opacity", 1);
        initZoom();

      });

      map_application.insertBefore(svg_o.node(), map_application.childNodes[0]);

    }, false);

  });
})()
