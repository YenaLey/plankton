package plankton.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import plankton.backend.dto.PostDTO;
import plankton.backend.entity.Event;
import plankton.backend.entity.Post;
import plankton.backend.repository.EventRepository;
import plankton.backend.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final EventRepository eventRepository;

    public PostService(PostRepository postRepository, EventRepository eventRepository) {
        this.postRepository = postRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public void createPost(PostDTO postDTO) {
        Event event = eventRepository.findById(postDTO.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        Post post = Post.builder()
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .image(postDTO.getImage())
                .level(postDTO.getLevel())
                .createdAt(LocalDateTime.now())
                .event(event)
                .build();

        postRepository.save(post);
    }

    public PostDTO getPostById(Long id) {
        return postRepository.findById(id)
                .map(post -> PostDTO.builder()
                        .postId(post.getPostId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .image(post.getImage())
                        .level(post.getLevel())
                        .createdAt(post.getCreatedAt())
                        .eventId(post.getEvent().getEventId())
                        .build())
                .orElseThrow(() -> new IllegalArgumentException("Post with id " + id + " not found"));
    }

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> PostDTO.builder()
                        .postId(post.getPostId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .image(post.getImage())
                        .level(post.getLevel())
                        .createdAt(post.getCreatedAt())
                        .eventId(post.getEvent().getEventId())
                        .build())
                .collect(Collectors.toList());
    }

}
