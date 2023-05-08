export interface PostDB {
  id: string;
  created_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface PostModel {
  id: string;
  content: string;
  created_id: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface LikeDislikeDB {
  user_id: string;
  post_id: string;
  like: number;
  created_at: string;
  updated_at: string;
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY_LIKED",
  ALREADY_DISLIKED = "ALREADY_DISLIKED",
}

export class Post {
  constructor(
    private Userid: string,
    private Usercontent: string,
    private Userlikes: number,
    private Userdislikes: number,
    private UsercreatedAt: string,
    private UserupdatedAt: string,
    private Usercreated_id: string
  ) {}

  public getId(): string {
    return this.Userid;
  }
  public getContent(): string {
    return this.Usercontent;
  }
  public setContent(Usercontent: string) {
    this.Usercontent = Usercontent;
  }
  public getLikes(): number {
    return this.Userlikes;
  }
  public setLikes(Userlikes: number) {
    this.Userlikes = Userlikes;
  }
  public addLike = (): void => {
    this.Userlikes++;
  };
  public removeLike = (): void => {
    this.Userlikes--;
  };
  public getDislikes(): number {
    return this.Userdislikes;
  }
  public setDislikes(Userdislikes: number) {
    this.Userdislikes = Userdislikes;
  }
  public addDislike = (): void => {
    this.Userdislikes++;
  };
  public removeDislike = (): void => {
    this.Userdislikes--;
  };
  public getCreatedAt(): string {
    return this.UsercreatedAt;
  }

  public setCreatedAt(UsercreatedAt: string) {
    this.UsercreatedAt = UsercreatedAt;
  }

  public getUpdatedAt(): string {
    return this.UserupdatedAt;
  }

  public setUpdatedAt(UserupdatedAt: string) {
    this.UserupdatedAt = UserupdatedAt;
  }
  public getCreatorId(): string {
    return this.Usercreated_id;
  }
  public setCreatorId(Usercreated_id: string) {
    this.Usercreated_id = Usercreated_id;
  }

  public toDBModel(): PostDB {
    return {
      id: this.Userid,
      created_id: this.Usercreated_id,
      content: this.Usercontent,
      likes: this.Userlikes,
      dislikes: this.Userdislikes,
      created_at: this.UsercreatedAt,
      updated_at: this.UserupdatedAt,
    };
  }

  public toBusinessModel(): PostModel {
    return {
      id: this.Userid,
      content: this.Usercontent,
      likes: this.Userlikes,
      dislikes: this.Userdislikes,
      created_at: this.UsercreatedAt,
      updated_at: this.UserupdatedAt,
      created_id: this.Usercreated_id,
    };
  }
}
