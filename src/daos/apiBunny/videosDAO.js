// videosDAO.js
import fetch from 'node-fetch';

class VideosDAO {
	constructor() {
		this.bunnyLibraryId = process.env.BUNNY_LIBRARY_ID;
		this.bunnyAccessKey = process.env.BUNNY_ACCESS_KEY;
	}

	async getVideosData() {
		const url = `https://video.bunnycdn.com/library/${this.bunnyLibraryId}/videos`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				AccessKey: `${this.bunnyAccessKey}`,
			},
		};

		try {
			const resFetch = await fetch(url, options);
			const json = await resFetch.json();
			const videoList = json.items.map(item => {
				return {
					guid: item.guid,
					title: item.title,
					metaTags: item.metaTags,
					thumbnailFileName: item.thumbnailFileName,
					length: item.length,
				};
			});
			return videoList;
		} catch (err) {
			console.error('error:' + err);
			throw err;
		}
	}
}

export default VideosDAO;
