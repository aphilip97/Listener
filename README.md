# Listener

A GUI similar to that of [YouTube's chapters feature][1] for
navigating a single audio file that contain multiple songs in
the browser.

## Installation

> **NOTE**: This is an unpublished unpacked extension 😱. Use at
>, as much risk, as a simple GUI can be to you.
>
> **NOTE 2**: This extension currently only works in Google
> Chrome. I will try to add support for FireFox if I can but
> no promises 🙂.

### How to install

1. Download the project.
    * Click on the green button that says **Code**.
    * Click on the button that says **Download ZIP**.
2. Go to the extensions page in your browser by pasting
`chrome://extensions` into your address bar.
3. Enable developer mode by clicking on the button in the top
right of the extensions page that says **Developer mode**. It
should be a round toggle button.
4. Click the button in the top left corner of the extensions
page that says **Load unpacked**.
5. Select the folder that you downloaded.

## Usage

If you have a single audio file with multiple songs and
timestamps for each song then create a text file and rename the
extension to `.listen`. After that open the file in a text
editor and paste the following into it.

```json
{
  "title": "",
  "src": "",
  "ext": "",
  "tracklist": [
    {
      "timestamp": "00:00",
      "name": "Song 1."
    },
    {
      "timestamp": "02:49",
      "name": "Song 2."
    },
    {
      "timestamp": "01:04:17",
      "name": "Song that is at 1 hour 4 min into the audio."
    },
    {
      "timestamp": "01:09:11",
      "name": "Song after the one that is at 1 hour and 4 min."
    },
  ]
}
```

This is in a data format called JSON but all you need do is put:

* the title of the audio (could be an album name or the file
name) in the empty quotes here `"title": "",`.
* the path to the audio file in the empty quotes here
`"src": "",`. They need to formatted a specific way. An easy way
to get the formatted path is by opening the audio file with your
browser and copying the path in the address bar.
* the extension of the audio file in the empty quotes here
`"ext": "",`.

The timestamps and names of the individual songs are hopefully
self-explanatory.

Copy and paste the block as many times as
there are songs in your audio file.

> **NOTE** It is okay to have timestamps under the first hour in
the format `hh:mm:ss`. They don't have to follow the `mm:ss`
format shown in the example above.

### Supported file formats

* .webm
* .m4a
* .mp3

## Development

Clone the repo and run `npm install` to install all the
dependencies.

### Environment variables

The project will put the compiled extension in a folder called
`output` at the root of the project by default.

This is the folder that you should load into the extension
after making your changes.

You can change the output directory by specifying an `OUTDIR`
variable in your environment.

[1]: https://support.google.com/youtube/answer/9884579?hl=en
