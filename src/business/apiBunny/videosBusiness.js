// videosBusiness.js
import VideosDAO from '#DAO/apiBunny/videosDAO.js';

class VideosBusiness {
	constructor() {
		this.videosDAO = new VideosDAO();
	}

	async getAllVideosData() {
		try {
			const videoData = await this.videosDAO.getVideosData();
			const videoList = videoData.map(item => {
				const bunnyVideoDescription = item.metaTags.find(
					tag => tag.property === 'description',
				);
				const jsonStringInBunnyVideoDescription = bunnyVideoDescription
					? bunnyVideoDescription.value.replace(/'/g, '"')
					: '{}';

				let jsonObjInBunnyVideoDescription = {};

				try {
					jsonObjInBunnyVideoDescription = JSON.parse(
						jsonStringInBunnyVideoDescription,
					);
				} catch (error) {
					console.error('Error:', error.message);
					console.log(
						'------' +
							item.title +
							'-------' +
							jsonStringInBunnyVideoDescription +
							'-------------',
					);
				}

				return {
					guid: item.guid,
					title: item.title,
					categories: jsonObjInBunnyVideoDescription.Categories
						? jsonObjInBunnyVideoDescription.Categories
						: [],
					thumbnailFileName: item.thumbnailFileName,
					lengthTimeMinutes: Math.ceil(item.length / 60),
				};
				// esto del jsonObjInBunnyVideoDescription es muy raro pero bueno se improvisa con lo que hay en la pagina de bunny.net
			});
			return videoList;
		} catch (err) {
			console.error('error:' + err);
			throw err;
		}
	}
}

export default VideosBusiness;
