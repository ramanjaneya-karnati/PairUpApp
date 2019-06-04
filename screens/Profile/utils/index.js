import {getUserTokenFromLocalStorage} from "../../../utils";
import ApiUrls from "../../../constants/ApiUrls";

export async function processUserData(dispatcher, data) {
  const token = await getUserTokenFromLocalStorage();
  const images = data.images;
  for (let i = 0; i < 6; i++) {
    if (!images[i]) {
      images[i] = {
        url: 'http://www.uaos.unios.hr/web2019/wp-content/uploads/2018/10/placeholder.jpg',
        thumbUrl: 'http://www.uaos.unios.hr/web2019/wp-content/uploads/2018/10/placeholder.jpg'
      }
    } else {
      images[i] = {
        id: images[i].id,
        url: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageLocation}`,
        thumbUrl: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageThumbnailLocation}`,
        thumbPath: images[i].imageThumbnailLocation,
        imagePath: images[i].imageLocation
      }
    }
  }

  let lookingForMan = true;
  let lookingForWoman = true;

  if (data.preferredGender === null) {
    if (data.gender === 'M') {
      lookingForWoman = true;
      lookingForMan = false;
    } else {
      lookingForWoman = false;
      lookingForMan = true;
    }
  }
  if (data.preferredGender === 'M') {
    lookingForWoman = false;
  }
  if (data.preferredGender === 'F') {
    lookingForMan = false;
  }
  data.isVisible = !data.isVisible;

  data.lookingForMen = lookingForMan;
  data.lookingForWomen = lookingForWoman;

  data.gender = data.gender && data.gender === 'M' ? 0 : 1;

  data.preferredAgeRangeMin = data.preferredAgeRangeMin || 18;
  data.preferredAgeRangeMax = data.preferredAgeRangeMax || 50;

  return data;
}
