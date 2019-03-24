using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CodeFreak1.Models
{
    public partial class DBCodeFreakContext : DbContext
    {
        public DBCodeFreakContext()
        {
        }

        public DBCodeFreakContext(DbContextOptions<DBCodeFreakContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Connection> Connection { get; set; }
        public virtual DbSet<Difficulty> Difficulty { get; set; }
        public virtual DbSet<Editorial> Editorial { get; set; }
        public virtual DbSet<LoginHistory> LoginHistory { get; set; }
        public virtual DbSet<Messages> Messages { get; set; }
        public virtual DbSet<Permissions> Permissions { get; set; }
        public virtual DbSet<PermissionsMapping> PermissionsMapping { get; set; }
        public virtual DbSet<Problem> Problem { get; set; }
        public virtual DbSet<ProblemTestCase> ProblemTestCase { get; set; }
        public virtual DbSet<ProblemType> ProblemType { get; set; }
        public virtual DbSet<ProgrammingLanguage> ProgrammingLanguage { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Submission> Submission { get; set; }
        public virtual DbSet<SubmissionProblemTestCase> SubmissionProblemTestCase { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=DBCodeFreak;Trusted_Connection=True;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.CommentId).ValueGeneratedNever();

                entity.Property(e => e.CommentDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Problem)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.ProblemId)
                    .HasConstraintName("FK_Comment_Problem");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Users");
            });

            modelBuilder.Entity<Connection>(entity =>
            {
                entity.Property(e => e.ConnectionId)
                    .HasColumnName("ConnectionID")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Connection)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Connectio__UserI__05D8E0BE");
            });

            modelBuilder.Entity<Difficulty>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Editorial>(entity =>
            {
                entity.Property(e => e.EditorialId).ValueGeneratedNever();

                entity.Property(e => e.Code).IsRequired();

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.Editorial)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Editorial_ProgrammingLanguage");

                entity.HasOne(d => d.Problem)
                    .WithMany(p => p.Editorial)
                    .HasForeignKey(d => d.ProblemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Editorial_Problem");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Editorial)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Editorial_Users");
            });

            modelBuilder.Entity<LoginHistory>(entity =>
            {
                entity.Property(e => e.LoginHistoryId).HasColumnName("LoginHistoryID");

                entity.Property(e => e.LoginId)
                    .IsRequired()
                    .HasColumnName("LoginID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LoginTime).HasColumnType("datetime");

                entity.Property(e => e.MachineIp)
                    .IsRequired()
                    .HasColumnName("MachineIP")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<Messages>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DateOfText).HasColumnType("datetime");

                entity.Property(e => e.MessageText)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.Reciever)
                    .WithMany(p => p.MessagesReciever)
                    .HasForeignKey(d => d.RecieverId)
                    .HasConstraintName("FK__Messages__Reciev__1AD3FDA4");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.MessagesSender)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("FK__Messages__Sender__19DFD96B");
            });

            modelBuilder.Entity<Permissions>(entity =>
            {
                entity.HasKey(e => e.PermissionId);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.Permissions)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_Permissions_Users");
            });

            modelBuilder.Entity<PermissionsMapping>(entity =>
            {
                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.PermissionsMapping)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionsMapping_Permissions");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.PermissionsMapping)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionsMapping_Roles");
            });

            modelBuilder.Entity<Problem>(entity =>
            {
                entity.Property(e => e.ProblemId).ValueGeneratedNever();

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.PostDateTime).HasColumnType("datetime");

                entity.Property(e => e.Title).IsRequired();

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Problem)
                    .HasForeignKey(d => d.AuthorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Problem_Users");

                entity.HasOne(d => d.Difficulty)
                    .WithMany(p => p.Problem)
                    .HasForeignKey(d => d.DifficultyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Problem_Difficulty");

                entity.HasOne(d => d.ProblemType)
                    .WithMany(p => p.Problem)
                    .HasForeignKey(d => d.ProblemTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Problem_ProblemType");
            });

            modelBuilder.Entity<ProblemTestCase>(entity =>
            {
                entity.Property(e => e.ProblemTestCaseId).ValueGeneratedNever();

                entity.Property(e => e.InputFilePath).IsRequired();

                entity.Property(e => e.OutputFilePath).IsRequired();

                entity.HasOne(d => d.Problem)
                    .WithMany(p => p.ProblemTestCase)
                    .HasForeignKey(d => d.ProblemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProblemTestCase_Problem");
            });

            modelBuilder.Entity<ProblemType>(entity =>
            {
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<ProgrammingLanguage>(entity =>
            {
                entity.HasKey(e => e.LanguageId);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.Property(e => e.RatingId).ValueGeneratedNever();

                entity.Property(e => e.RateDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Problem)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.ProblemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Problem");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Users");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ModifiedByNavigation)
                    .WithMany(p => p.Roles)
                    .HasForeignKey(d => d.ModifiedBy)
                    .HasConstraintName("FK_Roles_Users");
            });

            modelBuilder.Entity<Submission>(entity =>
            {
                entity.Property(e => e.SubmissionId).ValueGeneratedNever();

                entity.Property(e => e.Code).IsRequired();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.SubmissionDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.Submission)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Submission_ProgrammingLanguage");

                entity.HasOne(d => d.Problem)
                    .WithMany(p => p.Submission)
                    .HasForeignKey(d => d.ProblemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Submission_Problem");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Submission)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Submission_Users");
            });

            modelBuilder.Entity<SubmissionProblemTestCase>(entity =>
            {
                entity.Property(e => e.SubmissionProblemTestCaseId).ValueGeneratedNever();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.UserOutputFilePath).IsRequired();

                entity.HasOne(d => d.ProblemTestCase)
                    .WithMany(p => p.SubmissionProblemTestCase)
                    .HasForeignKey(d => d.ProblemTestCaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubmissionProblemTestCase_ProblemTestCase");

                entity.HasOne(d => d.Submission)
                    .WithMany(p => p.SubmissionProblemTestCase)
                    .HasForeignKey(d => d.SubmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubmissionProblemTestCase_Submission");
            });

            modelBuilder.Entity<UserRoles>(entity =>
            {
                entity.HasKey(e => e.UserRoleId);

                entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoles_Roles");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoles_Users1");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
