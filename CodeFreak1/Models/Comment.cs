using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Comment
    {
        public Guid CommentId { get; set; }
        public Guid UserId { get; set; }
        public Guid? ProblemId { get; set; }
        public string Description { get; set; }
        public DateTime CommentDateTime { get; set; }
        public bool IsReply { get; set; }
        public Guid? ReplyId { get; set; }

        public Problem Problem { get; set; }
        public Users User { get; set; }
    }
}
