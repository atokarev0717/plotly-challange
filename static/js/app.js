function plot() {
    // Using D3 to read the JSON file
    d3.json("./samples.json").then(data => {
        console.log(data);
        // Save values from json to build plots
        var name = data.names[0];
        console.log(name);
        var values = data.samples[0].sample_values.slice(0, 10).reverse();
        var OTU_IDs = data.samples[0].otu_ids.slice(0, 10).reverse();
        var OTU_Labels = data.samples[0].otu_labels.slice(0, 10).reverse();
        console.log(values);
        console.log(OTU_IDs);
        console.log(OTU_Labels);

        var barPlot_OTU_id = OTU_IDs.map(n => "OTU ID " + n);
        console.log(barPlot_OTU_id);
        console.log(values);

        var trace1 = {
            x: values,
            y: barPlot_OTU_id,
            text: OTU_Labels,
            marker: {
                color: 'light blue'},
             type: "bar",
             orientation: "h",
            };
        
        var data = [trace1];

        var layout = {
            title: "TOP 10 OTU",
            yaxis: {
                tickmode: "linear"            
            },

            };

        Plotly.newPlot("bar", data, layout);
          


    });

};

plot()
