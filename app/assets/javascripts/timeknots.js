var TimeKnots = {
  draw: function(id, events, options){
    var cfg = {
      width: 600,
      height: 200,
      radius: 10,
      lineWidth: 4,
      color: "#999",
      background: "#FFF",
      dateFormat: "%Y/%m/%d %H:%M:%S",
      horizontalLayout: true,
      showLabels: false,
      labelFormat: "%Y/%m/%d %H:%M:%S",
      addNow: false,
      seriesColor: d3.scaleOrdinal(d3.schemeCategory20),
      dateDimension: true
    };
    var leftpos=30;

    //default configuration overrid
    if(options != undefined){
      for(var i in options){
        cfg[i] = options[i];
      }
    }
    if(cfg.addNow != false){
      events.push({date: new Date(), name: cfg.addNowLabel || "Today"});
    }
    var tip = d3.select(id)
    .append('div')
    .style("opacity", 0)
    .style("position", "absolute")
    .style("font-family", "Helvetica Neue")
    .style("font-weight", "300")
    .style("background","rgba(0,0,0,0.5)")
    .style("color", "white")
    .style("padding", "5px 10px 5px 10px")
    .style("-moz-border-radius", "8px 8px")
    .style("border-radius", "8px 8px");
    var svg = d3.select(id).append('svg').attr("width", cfg.width).attr("height", cfg.height);
    //Calculate times in terms of timestamps
    if(!cfg.dateDimension){
      var timestamps = events.map(function(d){return  d.value});//new Date(d.date).getTime()});
      var maxValue = d3.max(timestamps);
      var minValue = d3.min(timestamps);
    }else{
      var timestamps = events.map(function(d){return  Date.parse(d.date);});//new Date(d.date).getTime()});
      var maxValue = d3.max(timestamps);
      var minValue = d3.min(timestamps);
    }
    var margin = (d3.max(events.map(function(d){return d.radius})) || cfg.radius)*1.5+cfg.lineWidth;
    var step = (cfg.horizontalLayout)?((cfg.width-2*margin)/(maxValue - minValue)):((cfg.height-2*margin)/(maxValue - minValue));
    var series = [];
    if(maxValue == minValue){step = 0;if(cfg.horizontalLayout){margin=cfg.width/2}else{margin=cfg.height/2}}

    linePrevious = {
      x1 : null,
      x2 : null,
      y1 : null,
      y2 : null
    }

    svg.selectAll("line")
    .data(events).enter().append("line")
    .attr("class", "timeline-line")
      .attr("x1", function(d){
                      var ret;
                      if(cfg.horizontalLayout){
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue) + margin)
                      }
                      else{
                        //ret = Math.floor(cfg.width/2)
                        ret = leftpos
                      }
                      linePrevious.x1 = ret
                      return ret
                      })
    .attr("x2", function(d){
                      if (linePrevious.x1 != null){
                          return linePrevious.x1
                      }
                      if(cfg.horizontalLayout){
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue ))
                      }
                      //return Math.floor(cfg.width/2)
                        ret = leftpos
                      })
    .attr("y1", function(d){
                      var ret;
                      if(cfg.horizontalLayout){
                        ret = Math.floor(cfg.height/2)
                      }
                      else{
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue)) + margin
                      }
                      linePrevious.y1 = ret
                      return ret
                      })
    .attr("y2", function(d){
                      if (linePrevious.y1 != null){
                        return linePrevious.y1
                      }
                      if(cfg.horizontalLayout){
                        return Math.floor(cfg.height/2)
                      }
                      var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                      return Math.floor(step*(datum - minValue))
                      })
    .style("stroke", function(d){
                      if(d.color != undefined){
                        return d.color
                      }
                      if(d.series != undefined){
                        if(series.indexOf(d.series) < 0){
                          series.push(d.series);
                        }
                        return cfg.seriesColor(series.indexOf(d.series));
                      }
                      return cfg.color})
    .style("stroke-width", cfg.lineWidth);

    svg.selectAll("circle")
    .data(events).enter()
    .append("circle")
    .attr("class", "timeline-event")
    .attr("data-argtitle", function(d) { return d.argtitle})
    .attr("data-arglink", function(d) { return d.arglink})
    .attr("r", function(d){if(d.radius != undefined){return d.radius} return cfg.radius})
    .style("stroke", function(d){
                    if(d.color != undefined){
                      return d.color
                    }
                    if(d.series != undefined){
                      if(series.indexOf(d.series) < 0){
                        series.push(d.series);
                      }
                      console.log(d.series, series, series.indexOf(d.series));
                      return cfg.seriesColor(series.indexOf(d.series));
                    }
                    return cfg.color}
    )
    .style("stroke-width", function(d){if(d.lineWidth != undefined){return d.lineWidth} return cfg.lineWidth})
    .style("fill", function(d){if(d.background != undefined){return d.background} return cfg.background})
    .attr("cy", function(d){
        if(cfg.horizontalLayout){
          return Math.floor(cfg.height/2)
        }
        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
        return Math.floor(step*(datum - minValue) + margin)
    })
    .attr("cx", function(d){
        if(cfg.horizontalLayout){
          var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
          var x=  Math.floor(step*(datum - minValue) + margin);
          return x;
        }
        //return Math.floor(cfg.width/2)
        return leftpos
    }).on("click", function(d){
      //alert("click");
    }).on("mouseover", function(d){
      if(cfg.dateDimension){
        var format = d3.timeFormat(cfg.dateFormat);
        var datetime = format(new Date(d.date));
        var dateValue = (datetime != "")?(d.name +" <small>("+datetime+")</small>"):d.name;
      }else{
        var format = function(d){return d}; // TODO
        var datetime = d.value;
        var dateValue = d.name +" <small>("+d.value+")</small>";
      }

      d3.select(this)
      .style("fill", function(d){if(d.color != undefined){return d.color} return cfg.color}).transition()
      .duration(100).attr("r",  function(d){if(d.radius != undefined){return Math.floor(d.radius*1.5)} return Math.floor(cfg.radius*1.5)});
      //tip.html("");
      if(d.img != undefined){
      //  tip.append("img").style("float", "left").style("margin-right", "4px").attr("src", d.img).attr("width", "64px");
      }
      //tip.append("div").style("float", "left").html(dateValue );
      //tip.transition()
      //.duration(100)
      //.style("opacity", .9);
    })
    .on("mouseout", function(){
        d3.select(this)
        .style("fill", function(d){if(d.background != undefined){return d.background} return cfg.background}).transition()
        .duration(100).attr("r", function(d){if(d.radius != undefined){return d.radius} return cfg.radius});
        tip.transition()
        .duration(100)
    .style("opacity", 0)});

    //test ut å legge til tekst på hvert stopp
    svg.selectAll("text")
    .data(events).enter()
    .append("text")
       .text(function(d) {
         var time = new Date(d.value * 1000).toISOString().substr(11, 8).slice(3);
         return time+" "+d.name; })
       .style("font-size", "100%")
       .attr("y", function(d){
           var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
           return Math.floor(step*(datum - minValue) + margin)+5
       })
       .attr("x", function(d){
           //return Math.floor(cfg.width/2)+20
           return leftpos+20
       })
       .call(wrap, 150);

    //Adding start and end labels
    if(cfg.showLabels != false){
      if(cfg.dateDimension){
        var format = d3.timeFormat(cfg.labelFormat);
        var startString = format(new Date(minValue));
        var endString = format(new Date(maxValue));
      }else{
        var format = function(d){return d}; //Should I do something else?
        var startString = minValue;
        var endString = maxValue;
      }
      svg.append("text")
         .text(startString).style("font-size", "100%")
         .attr("x", function(d){if(cfg.horizontalLayout){return d3.max([0, (margin-this.getBBox().width/2)])} return Math.floor(this.getBBox().width/2)})
         .attr("y", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.height/2+(margin+this.getBBox().height))}return margin+this.getBBox().height/2});

      svg.append("text")
         .text(endString).style("font-size", "100%")
         .attr("x", function(d){if(cfg.horizontalLayout){return  cfg.width -  d3.max([this.getBBox().width, (margin+this.getBBox().width/2)])} return Math.floor(this.getBBox().width/2)})
         .attr("y", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.height/2+(margin+this.getBBox().height))}return cfg.height-margin+this.getBBox().height/2})
    }


    svg.on("mousemove", function(){
        tipPixels = parseInt(tip.style("height").replace("px", ""));
    return tip.style("top", (d3.event.pageY-tipPixels-margin)+"px").style("left",(d3.event.pageX+20)+"px");})
    .on("mouseout", function(){return tip.style("opacity", 0).style("top","0px").style("left","0px");});
  }
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}
