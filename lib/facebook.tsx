import { getPosts } from '../services'
import { json } from '../types'

const facebook = async (
  mode: 'blog' | 'json',
  postNumber: number,
  json: json[]
) => {
  let post = ''
  let url = ''

  if (mode === 'blog') {
    //used to post a new post
    const data = await getPosts()
    post = data[data.length - 1].node.excerpt
    url = `https://barefootrecipe.com/post/${data[postNumber].node.slug}`
  } else {
    // used to post from json
    post =
      json[postNumber].title +
      ' - ' +
      json[postNumber].content +
      ' ' +
      json[postNumber].tags
    url = json[postNumber].imageURl
  }

  const response = await fetch(
    `https://graph.facebook.com/v15.0/108454552132944/feed?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `debug=all&format=json&message=${post}&link=${url}&method=post&pretty=0&suppress_http_code=1&transport=cors`,
      method: 'POST',
    }
  )
  console.log(await response.json())
  return json[postNumber].title + ' was posted successfully'
}

export default facebook
