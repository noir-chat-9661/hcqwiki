export interface Article {
	id: string;
	title: string;
	content: string; // markdown content
	route: string;
	genres: string[]; // optional array of genres
	parentId: string[]; // optional parent article id
}

export interface ArticleMap {
	id: string;
	title: string;
	route: string;
	parentId: string[]; // optional parent article id
	genres: string[]; // optional array of genres
}
