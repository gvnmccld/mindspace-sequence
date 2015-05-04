# Video Sequencing 

## Requirements

1. You see 5 thumbnails (clips) in a column to the left of the application
2. To the right of that column, you see a placeholder for a video with 5 empty clip areas underneath
3. You are to drag the shuffled clips from the left to the row placeholders under the video in the correct order
4. When you drop the 5th item, you should tell the user if you they are in the right order by:
    1. Marking correct items with a green border
    2. Marking incorrect items with a red border
    3. Set the percentage correct score using the LMS API
    4. If the percentage correct is > 80%, mark the lesson complete, else, incomplete using the same API.
4. If all are correct, dim the placeholders 50% and play the video in the video area.
5. Do not rely on jQuery.

## Demo Application

http://cannon.pw/sequence

## Setup

1. Clone repo
2. Run: npm install
3. modify bin/www with your port info (or set port env var)
4. node bin/www

## Next Steps

1. Depending on client needs, resize images to make them fit the page better.
2. Implement LMS API (progress saving, time taken to complete, lesson status, etc.)
3. Adjust display in specific resolutions that will be used.
4. Utilize underscore.js or lodash.js to make the JS easier to read and cleaner