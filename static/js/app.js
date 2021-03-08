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
        
        var data1 = [trace1];

        var layout1 = {
            title: "TOP 10 OTU",
            yaxis: {
                tickmode: "linear"            
            },

            };

        Plotly.newPlot("bar", data1, layout1);


        // Bubble chart settings 
        var trace2 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text:  data.samples[0].otu_labels

        };

        // bubble plot layout
        var layout2 = {
            xaxis:{title: "OTU ID"},
        };

        // creating data variable 
        var data2 = [trace2];

    // create the bubble plot
    Plotly.newPlot("bubble", data2, layout2); 



    });

};

plot()


