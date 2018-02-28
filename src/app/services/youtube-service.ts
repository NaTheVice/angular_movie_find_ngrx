import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class YoutubeService {
    public videos = [];
    public videoClone = [];

  constructor(private http: HttpClient) {}

  public setData(videos) {
    videos.forEach(video => {
      const viewCount = Math.floor(Math.random() * 5000000) + 10000;
      video.snippet.views = viewCount;
      video.snippet.title = video.snippet.title.replace(
        /[^a-z0-9áéíóúñü \.,_-]/gim,
        ''
      );
    });
    this.setVideos(videos);
  }

  public setVideos(videos) {
    this.videos = videos;
    this.videoClone = videos;

  }

  public searchYouTube(query) {
    const baseURL = 'https://www.googleapis.com/youtube/v3/search?';
    const specs = 'safeSearch=moderate&part=snippet&q=';
    const maxResults = '&maxResults=50&key=';
    const apiKey = 'AIzaSyC4W2PcBHccKu03OiW8l5Ff8LfsgdS5C44';
    const URL = baseURL + specs + query + maxResults + apiKey;
    return this.http.get<any>(URL).subscribe(response => {
      this.setData(response.items);
    });
  }

}
