<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Interfaces\ArticleRepositoryInterface;

class ArticlesRepository implements ArticleRepositoryInterface
{
    public function getAllArticles()
    {
        return Article::all();
    }

    public function getArticleById($id)
    {
        return Article::find($id);
    }

    public function createArticle(array $data)
    {
        return Article::create($data);
    }

    public function updateArticle($id, array $data)
    {
        return Article::find($id)->update($data);
    }

    public function deleteArticle($id)
    {
        return Article::destroy($id);
    }
}