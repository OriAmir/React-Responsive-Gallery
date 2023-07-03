# React-Responsive-Gallery - Responsive Gallery for react application.

![example workflow](https://github.com/OriAmir/react-responsive-gallery/actions/workflows/npm-publish.yml/badge.svg)

<b>Main features</b><br/>

- Support both types of media: image and video.
- Custom for every screen width size.
- Dynamic properties for every screen width size.
- Media could be selected and controlled/uncontrolled easily.
- Accessibility support.
- Simple to use.
- Work with `Lightbox` for media display.
- Full typescript support.
- Tested with React Testing Library.
  <br/>

<h3>Getting started</h3>
 
```
 npm install react-responsive-gallery
```
or

```
 yarn add react-responsive-gallery
```

<br/>

<h3>Playground</h3>
You can play with the library in 
<a href="https://codesandbox.io/s/react-responsive-gallery-pt5d4g?file=/src/App.tsx" target="_blank"> Codesandbox</a> or in
<a href="https://stackblitz.com/edit/react-responsive-gallery" target="_blank"> Stackblitz</a> .

<br/>
<h3>Basic using example</h3>
 
```
import ReactDOM from 'react-dom/client';
import ResponsiveGallery from 'react-responsive-gallery';

const media=[
{
src: 'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2019/06/12/15/07/cat-4269479_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2014/07/08/12/36/bird-386725_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2015/10/12/15/46/fallow-deer-984573_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2013/09/22/15/29/prairie-dog-184974_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg'
},
{
src: 'https://cdn.pixabay.com/photo/2019/03/09/17/30/horse-4044547_960_720.jpg'
}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResponsiveGallery media={media}/>);
```

<br/>

<h3>Width groups explanation</h3>

The Gallery has 6 different of width groups: <b>xs, s, m, l, xl, xxl .</b> <br/>
The Gallery renders again when the group changes.<br/>
You can change the group sizes by your preferences , the default group values are:<br/><br/>
- <b>xs:</b> From 0 to 420px<br/><br/>
- <b>s:</b> From 420px to 600px<br/><br/>
- <b>m:</b> From 600px to 768px<br/><br/>
- <b>l:</b> From 768px to 992px<br/><br/>
- <b>xl:</b> From 992px to 1200px<br/><br/>
- <b>xxl:</b> From 1200px to infinity<br/></br>

<i>*You don't need to specify 'xxl' in your 'screenWidthSizes' object because it's take your max 'xl' group value until infinity.</i>

<br/>

<h3>Gallery options</h3>

| Property  | Type | Description | Default value  | is Required
| :------------- | :------------- | :------------- | :------------- | :-------------
| media |  Array | Array of media elements to display in the gallery. [Read more here](#media-options) |  None   | <b>Required</b>
| screenWidthSizes  | Object  | Gallery groups width break points. | ``{xs: 420,s: 600,m: 768,l: 992,xl: 1200}`` | Optional
| numOfMediaPerRow  | Object  | Number of media elements for row by the width groups. | ``{xs: 1,s: 2,m: 3,l: 3,xl: 4 xxl:5}`` | Optinal
| mediaMaxWidth  | Object  | Media max width <b>in %</b> by the width groups.  | ``{xs: 100,s: 100,m: 100,l: 100,xl: 100,xxl:100}`` | Optional
| colsPadding | Object  | Padding between media cols <b>in px</b> by the width groups. | ``{xs: 4,s: 4,m: 4,l: 4,xl: 4,xxl:4}`` | Optional
| mediaMarginBottom | Object  | Margin bottom between media <b>in px</b> by the width groups. | ``{xs: 4,s: 4,m: 4,l: 4,xl: 4,xxl:4}`` | Optional
| mediaClassName | string  | Class name that will apply on all the media on gallery | None | Optional
| mediaStyle | Object  | Object Style that will apply on all the media on gallery | None | Optional
| useLightBox | Boolean  | Use lightbox when clicking on media | false | Optional
| lightBoxAdditionalProps | object  | Additional props for the lightbox component. [Read more here](#using-lightbox) | false | Optional
| selectable | boolean  | Media could be selectable. [Read more here](#selectable-media) | false | Optional
| selectableMedia | Array  | Chosen media as part of the selectable items. | None | Optional
| onSelect | Function - (id:string,val:boolean)=>void  | Callback function when media is selected. | None | Optional
| onClick | Function - (id:string)=>void  | Callback function when media is clicked. | None | Optional
| customLoader | React component   | Loader show when media is loading | <img src="./src/assets/images/loader.svg" alt="loader" width="50"  height="50"/> | Optional
| customError | React component  | Error show when media failed to load| <img src="./src/assets/images/error.svg" alt="error" width="50"  height="50"/> | Optional

<br/><br/>

<h3>Media Options</h3>

| Property  | Type | Description  | Required  | Relevant to
| :------------- | :------------- | :------------- | :------------- | :-------------
| src | String | Media source url   | <b>Required</b> | Image / Video
| type | String("image"/"video") | Image/Video source url   | Optional, default is "image" | Image / Video
| id | String | Media Id ([Read more here](#if-you-will-not-pass-the-media-id))   | Optional (only if src is unique) | Image,Video
| alt | String | Image alternate text  | Optional | Image
| orderS |  Number  | Media order in small group sizes(xs, s)   |  Optional | Image,Video
| orderM  | Number| Media order in medium group sizes (m,l) | Optional | Image,Video
| orderL  |  Number | Media order in large group sizes(xl,xxl) | Optional | Image,Video
| mediaClassName | String | Media className for styling specific media element | Optional | Image / Video
| mediaStyle | Object | Media object style for styling specific media element | Optional | Image / Video
| title | String | Lightbox media title | Optional | Image
| videoType |  "video/mp4" / "video/webm" / "video/ogg" | Type of the video element | Optional, default is "video/mp4" |  Video
| additionalVideoProps | Object | Additional attributes for video as describe <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes">here</a> | Optional | Video

:warning: if you set orderS/orderL/orderM property only to part of the media elements the library first sorts the media elements with the property and then renders the other media elements.
<br/>

<h4>If you will not pass the media id</h4>
We need some unique identifier for every media eleemnt. Usually we use the `src` attribute but it's will be valid only if the `src` is unique. The media `id` is required if the media src is not unique.<br/>
If `src` property is not unique and media `id` is not supply the library will not work as expected.

<br/>
<h3>Selectable Media</h3>
Media could be selected via the gallery.<br/><br/>
The library expose function and hook to manage the media: <br/>
<b>getSelectedMedia</b>- function that return id's array of the selected media elements.<br/>
<b>useSelect</b>- hook that return id's array of the selected media , then we could listen to changes in the media if needed.<br/>
This hook will work as expected only AFTER the dom is initialized with the media. <br/><br/>
You can control the selected media yourself in your component or just get the media using function/hook.<br/>
<b>Uncontrolled</b> - The library will manage the selected media and you will get them using the <i>getSelectedMedia</i> function. To use that functionally you just need to pass the <i>selectable</i> boolean attribute to the library.<br/>
<b>Controlled</b> - You will manage the selected media yourself using <i>selectableMedia</i> and <i>onSelect</i> functions.<br/><br/>

:warning: If you will not pass the media <b>id</b> property to the media element the selected media will return as URL representation instead of id representation. In the case of a duplicate media URL, this feature will not work as expected.
<br/>
:warning: When passing the `onSelect` function to the library it's automatically move to <b>Uncontrolled</b> mode and will not manage the selected media any more.<br/>


<h3>Using Lightbox</h3>
You can use lightbox when clicking on one of the media that display on the gallery.
For the lightbox component library we use the <a target="_blank" href="https://github.com/igordanchenko/yet-another-react-lightbox">yet-another-react-lightbox library</a>.<br/>
You can sent the props from this library and to send them as prop to library called <b>'lightBoxAdditionalProps'</b>.</br>

:warning: These properties are not available to send as additional props (because we already using them internally):
`open, close, slides` <br/>

<br/><br/>

<h3>Author</h4>
<a target="_blank" href="https://github.com/OriAmir">Ori Amir</a>

<br/>

<h3>Bugs and Feedback</h4>
For bugs, questions and discussions please use the <a href="https://github.com/OriAmir/React-Responsive-Gallery/issues" target="_blank">Github Issues.</a>

<br/>
<h3>License</h4>
React Responsive Gallery is free to use for personal and commercial projects under the MIT License.
