<?php

namespace App\Http\Controllers;
use App\Models\comments;
use App\Models\User;
use App\Models\requestedcategories;
use Illuminate\Http\Request;

class Commentsc extends Controller
{
    public function getall()
    {
        $comments = comments::all();
        
        $commentsCustomized = $comments->map(function ($comment) {
            $user = User::find($comment->organiserid);
            return [
                'id' => $comment->id,
                'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
                'organizer' => $user->name, 
                'likes' => $comment->likes,
                'msg'=>$comment->msg,
            ];
        });
    
        return response()->json(['comments' => $commentsCustomized], 200);
    }

    public function index(Request $request){
        $data = $request->json()->all();

        $token = $request->header('token');
        $hePos = strpos($token, "he");
        $andPos = strpos($token, "And");

       
        $id = substr($token, 0, $hePos);

        $msg = $data['textareaValue'];

        comments::create([
            'organiserid' => $id,
            'msg' => $msg,
        ]);
        return response()->json(['message' => 'succes'], 200);
    }
    public function postliked(Request $request){
        $data = $request->json()->all();
        $id = $data['id'];
        comments::query()->where('id', $id)->increment('likes');
        return response()->json(['message' => 'succes'], 200);
    }
    public function newcatego(Request $request){
        $data = $request->json()->all();

        $msg = $data['textareaValue'];
        requestedcategories::create([
            'name' => $msg,
        ]);
        return response()->json(['message' => 'succes'], 200);
    }
}
