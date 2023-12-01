import { NotificationService } from "src/notification/notification.service";
import { Test, TestingModule } from '@nestjs/testing';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: {
            save: jest.fn().mockResolvedValue({}), // Mock the save method
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should create a notification', async () => {
    const notificationData = {
      // Your notification data here
    };

    // Assume you have a method in your service for creating notifications
    const result = await notificationService.createNotification(notificationData);

    expect(result).toEqual({}); // Check the expected result
    expect(notificationService.notificationRepository.save).toHaveBeenCalledWith(notificationData); // Check if the save method was called with the correct data
  });
});
