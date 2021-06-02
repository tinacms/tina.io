import axios from 'axios'

export async function getReleases() {
  return axios
    .get('https://api.github.com/repos/tinacms/tinacms/releases')
    .then(res => res.data)
}
