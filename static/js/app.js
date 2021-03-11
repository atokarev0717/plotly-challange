d3.json("./samples.json").then(data => {
    console.log(data);

//enter IDs into the dropdown menue on html page
    data.names.forEach(IDs => {
        var dropdown = d3.select("#selDataset");
        dropdown.append("option").text(IDs)
    });
    
});

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


function select_from_dropdown() {

    var dropdown = d3.select("#selDataset");
    var id = dropdown.property("value");
    console.log(id);
    
    function get_demographic_info(id) {
            d3.json("samples.json").then((data)=> {
                var metadata = data.metadata;
                console.log(metadata)
        
            // filter the data by id
            var filtered_data = metadata.filter(meta => meta.id.toString() === id)[0];
            // select demographic panel to put data
            var demographic_info = d3.select("#sample-metadata");
                
            // empty the demographic info panel each time before getting new id info
            demographic_info.html("");
        
            // grab the necessary demographic data data for the id and append the info to the panel
                Object.entries(filtered_data).forEach((key) => {   
                    demographic_info.append("h5").text(key[0] + ": " + key[1] + "\n");    
                });
            });
        };

    get_demographic_info(id);

};

function get_demographic_info(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

    // filter the data by id
    var filtered_data = metadata.filter(meta => meta.id.toString() === id)[0];
    // select demographic panel to put data
    var demographic_info = d3.select("#sample-metadata");
        
    // empty the demographic info panel each time before getting new id info
    demographic_info.html("");

    // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(filtered_data).forEach((key) => {   
            demographic_info.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
};

get_demographic_info('940');

d3.selectAll("#selDataset").on("change", select_from_dropdown);
plot();



