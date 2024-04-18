import AlbumModel from "./albumModel";
import TrackModel from "./trackModel";

export default interface AlbumFetchModel extends AlbumModel {
  copyrights: Array<{
      text: string,
      type: string
  }>
  label: string,
  popularity: BigInteger
  tracks: {
      items: TrackModel[]
  }
}