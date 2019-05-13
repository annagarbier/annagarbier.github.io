/* COOPER HEWITT COLORS ON DISPLAY
 * 
 * Fetch data from two Cooper Hewitt API sources
 *  1) First get basic info on 100 on-display collection items
 *  2) For each on-display item, get a list of colors
 *     for that item
 * 
 * All output data is stored in the global variable called
 * "csv". As of now, the user must query the variable's
 * content as a last step in order to get the data,
 * which is stored in deisplay_data.js
 * 
 * This final step is, of course, not the desired process,
 * but is the state it's in right now.
 * 
 * TODO: fix this final step.
 * */

const token="8d9ed1a899e6ff8bc3773e0f880c7e6e";
let csv = "title,color,url";

// Query the API's high-level database, which includes
// object_ids, titles, and information url.
async function getObjects() {
    let data_url = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${token}`);
    let data = await data_url.json();
    return data;
}

// For each object returned in getObjects(),
// query low-level database, which includes an
// array of colors related to the object.
async function getObjectColors() {
    let data = await getObjects();
    for (i in data.objects) {
        createNewDataLines(data.objects[i].id, data.objects[i].title, data.objects[i].url);
    }
}

function createNewDataLines(object_id, object_title, url) {
    const crayola_url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getColors&access_token=${token}&id=`;
    fetch(crayola_url + object_id)
        .then(response => response.json())
        .then(json => {
            let data_entry = "";
            for (j in json.colors) {
                // For every one of the object's colors, create a
                // new data entry line. Each line contains the object's
                // "object_title,color,url".
                data_entry += `\n"${object_title}","${json.colors[j].closest_crayola}","${url}"`;
            }
            return data_entry;
        })
        .then(data_entry => {csv += data_entry})
        .catch((err) => console.log(err));
}

getObjectColors();