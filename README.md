# MarkDownHTMLWithHapi
## This application process markdown-style (GitHub style) text and produce HTML
### Functionalities  
##### Request URL /markdown/save with query parameter 'data'
<p>  processes the data(transform to html), save to MongoDB and return ID of created record in MongoDB and created HTML.
##### Request url /markdown/get with query parameter 'id'
<p> returns the generated HTML associated with this record id.
### Installation
Clone it and just install packages by *npm install*.
To run the application, type *npm install*
To test the applictaion, type *mocha*
