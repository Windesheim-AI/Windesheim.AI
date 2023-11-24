describe('MyInfo Component', () => {
    beforeEach(() => {
      cy.visit('../src/screens/UserBg/MyInfo.tsx');
    });
  
    it('opens and closes modal', () => {
      cy.get('Pressable').eq(0).click(); // 첫 번째 Pressable 요소를 클릭하여 모달 열기
      cy.get('[data-testid=modalContent]').should('be.visible'); // 모달이 보이는지 확인
  
      cy.get('TouchableOpacity').contains('Close').click(); // Close 버튼을 클릭하여 모달 닫기
      cy.get('[data-testid=modalContent]').should('not.exist'); // 모달이 사라졌는지 확인
    });
  
    it('edits information', () => {
      cy.get('[data-testid=editButton]').click(); // EditButton을 클릭하여 수정 모드로 전환
  
      cy.get('Pressable').eq(1).click(); // 두 번째 Pressable 요소 클릭하여 모달 열기
      cy.get('[data-testid=modalContent]').should('be.visible'); // 모달이 보이는지 확인
  
      // 여기에 모달에서 원하는 항목을 선택하는 코드 추가
  
      cy.get('[data-testid=modalContent] TouchableOpacity').eq(0).click(); // 첫 번째 항목을 선택하거나 원하는 항목 선택
      cy.get('[data-testid=modalContent]').should('not.exist'); // 모달이 사라졌는지 확인
  
      cy.get('[data-testid=editButton]').click(); // EditButton을 클릭하여 수정 모드 종료
      // 변경된 정보가 화면에 올바르게 표시되는지 확인하는 코드 추가
    });
  });
  
  